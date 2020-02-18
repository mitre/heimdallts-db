import { schemas_1_0, parse, nist } from "inspecjs";
import { Evaluation } from "./models/Evaluation";
import { Platform } from "./models/Platform";
import { Statistic } from "./models/Statistic";
import { Profile } from "./models/Profile";
import { Group } from "./models/Group";
import { Support } from "./models/Support";
import { Control } from "./models/Control";
import { Ref } from "./models/Ref";
import { Description } from "./models/Description";
import { Tag } from "./models/Tag";
import { Result } from "./models/Result";
import { Op } from "sequelize";
import { Depend } from "./models/Depend";
import { Input } from "./models/Input";
import { Finding } from "./models/Finding";
import { WaiverDatum } from "./models/WaiverDatum";

/* TODO: Integrate transactions */

export async function upload_evaluation(
  evaluation: parse.AnyExec
): Promise<Evaluation> {
  // Build the outer Evaluation scaffolding data
  const platform = await intake_platform(evaluation.platform);
  const statistic = await intake_statistics(evaluation.statistics);
  const finding = await intake_finding_for(evaluation);

  // Create it
  const db_evaluation = await Evaluation.create({
    platform,
    statistic,
    finding
    // waiver_data: [],
    // inputs: [],
    // results: [],
    // profiles: [],
    // tags: []
  });

  // Convert the profiles
  const raw_profiles = evaluation.profiles;

  // For each profile:
  for (const raw_profile of raw_profiles) {
    // Fetch or convert it
    const db_profile = await fetch_or_create(raw_profile);

    // Establish relation to the evaluation
    db_evaluation.$add("profile", db_profile);

    // Handle inputs
    const inputs = await intake_inputs_from(raw_profile);
    db_evaluation.$add("inputs", inputs);

    // Build out a mapping of the db controls by their ids
    const db_controls: { [key: string]: Control } = {};
    for (const c of await db_profile.$get("controls")) {
      db_controls[c.control_id] = c;
    }

    // Use it to build them up from the raw data
    for (const raw_control of raw_profile.controls) {
      const db_control = db_controls[raw_control.id];

      // Get the waiver data, and handle linking it
      if (raw_control.waiver_data) {
        const wd = await intake_waiver_data(raw_control.waiver_data);
        wd.$set("evaluation", db_evaluation);
        wd.$set("control", db_control);
        wd.save();
      }

      // Process each result and link it
      for (const result of raw_control.results) {
        const res = await intake_result(result);
        res.$set("evaluation", db_evaluation);
        res.$set("control", db_control);
        res.save();
      }
    }

    await db_profile.save();
  }

  await db_evaluation.save();
  return db_evaluation;
}

/** Given a raw profile, attempts to fetch an already existing DB entry for that profile.
 * Otherwise, builds one and returns that instead.
 */
export async function fetch_or_create(
  profile: schemas_1_0.ExecJSON.Profile
): Promise<Profile> {
  console.warn(
    "Keying just by sha256 is not a satisfactory means of fetching a profile"
  );

  // Try fetch
  return Profile.findOne({
    where: {
      sha256: profile.sha256
    }
  }).then(found => {
    if (found) {
      return found;
    } else {
      // Otherwise build
      return intake_exec_profile_no_results(profile);
    }
  });
}

export async function intake_platform(
  platform: schemas_1_0.ExecJSON.Platform
): Promise<Platform> {
  return Platform.create({
    name: platform.name,
    release: platform.release
  });
}

// Since we store duration as string but inspecjs expects a number (which should maybe be reconsidered...?), need this
export async function intake_statistics(
  statistics: schemas_1_0.ExecJSON.Statistics
): Promise<Statistic> {
  return Statistic.create({
    duration: statistics.duration
  });
}

// Converts a profile without keeping any specific results
// Use this for the first-time intake of a given profile
export async function intake_exec_profile_no_results(
  profile: schemas_1_0.ExecJSON.Profile
): Promise<Profile> {
  // Convert the controls, etc.
  const controls = await Promise.all(
    profile.controls.map(intake_exec_control_no_results)
  );
  const groups = await Promise.all(profile.groups.map(intake_group));
  const supports = await Promise.all(profile.supports.map(intake_support));
  const depends = await Promise.all(
    profile.depends?.map(intake_dependency) || []
  );

  return new Profile({
    name: profile.name,
    sha256: profile.sha256,
    supports: supports,
    copyright: profile.copyright || undefined,
    copyright_email: profile.copyright_email || undefined,
    depends: depends,
    description: profile.description || undefined,
    groups: groups,
    // inspec_version: null, // TODO: We should track this
    license: profile.license || undefined,
    maintainer: profile.maintainer || undefined,
    // parent_profile: null, // TODO: We should track this, and probably also track overlays in a separate record table
    // skip_message: null, // TODO: Should eventually be moved to a separate record, on candidate key (Evaluation, Overlay)
    status: profile.status || undefined, // TODO: Ditto above, esp. because this can change on a per-execution basis
    summary: profile.summary || undefined,
    title: profile.title || undefined,
    version: profile.version || undefined,
    controls
    // inputs: [] // Initally empty
  });
}

export async function intake_group(
  group: schemas_1_0.ExecJSON.ControlGroup
): Promise<Group> {
  return Group.create({
    control_id: group.id,
    controls: group.controls,
    title: group.title
  });
}

export async function intake_support(
  support: schemas_1_0.ExecJSON.SupportedPlatform
): Promise<Support> {
  console.error("Error parsing support;");
  const ft = (key: keyof schemas_1_0.ExecJSON.SupportedPlatform): string =>
    support[key] || "";
  const name =
    ft("platform-family") +
    ft("os-family") +
    ft("platform-name") +
    ft("os-name") +
    ft("platform");
  const version = support.release || "";
  return Support.create({
    name: name,
    value: version
  });
}

export async function intake_exec_control_no_results(
  control: schemas_1_0.ExecJSON.Control
): Promise<Control> {
  // Convert our subfields
  const refs = await Promise.all(control.refs.map(intake_ref));
  const tags = await intake_control_tags(control.tags);
  const descriptions = control.descriptions
    ? await Promise.all(control.descriptions.map(intake_description))
    : [];

  // Reformatting
  return Control.create({
    control_id: control.id,
    impact: control.impact,
    refs: refs,
    source_location: control.source_location,
    tags: tags,
    code: control.code,
    desc: control.desc,
    descriptions: descriptions,
    title: control.title,
    waiver_data: [], // Begin empty
    results: [] // Begin empty
  });
}

export async function intake_ref(
  ref: schemas_1_0.ExecJSON.Reference
): Promise<Ref> {
  // Really just gotta remove nulls, because for some reason those are not accepted by the schema
  return Ref.create({
    ref: ref.ref || undefined,
    url: ref.url || undefined,
    uri: ref.uri || undefined
  });
}

export async function intake_dependency(
  dep: schemas_1_0.ExecJSON.ProfileDependency
): Promise<Depend> {
  return Depend.create({
    name: dep.name,
    path: dep.path,
    url: dep.url,
    status: dep.status,
    git: dep.git,
    branch: dep.branch
    // compliance: dep.compliance, // TODO: Add compliance
    // supermarket: dep.supermarket, // TODO: Add supermarket
  });
}

export async function intake_description(
  desc: schemas_1_0.ExecJSON.ControlDescription
): Promise<Description> {
  return Description.create({ label: desc.label, data: desc.data });
}

export async function intake_control_tags(
  tags: schemas_1_0.ExecJSON.Control["tags"]
): Promise<Tag[]> {
  const result: Tag[] = [];
  for (const key in tags) {
    result.push(
      await Tag.create({
        name: key,
        value: tags[key]
      })
    );
  }
  return result;
}

export async function intake_result(
  r: schemas_1_0.ExecJSON.ControlResult
): Promise<Result> {
  // Parse the date if possible
  const date = new Date(r.start_time);

  return Result.create({
    backtrace: r.backtrace,
    code_desc: r.code_desc,
    exception: r.exception,
    message: r.message,
    resource: r.resource,
    run_time: r.run_time,
    skip_message: r.skip_message,
    start_time: date,
    status: r.status
  });
}

/** Given a profile, uploads its inputs and returns their DB model references. */
export async function intake_inputs_from(
  p: schemas_1_0.ExecJSON.Profile
): Promise<Input[]> {
  console.warn("Inputs not yet properly supported");
  const result: Input[] = [];
  for (const attribute of p.attributes) {
    const rv = await Input.create({
      name: attribute["name"],
      value: attribute["value"]
    });
    result.push(rv);
  }
  return result;
}

export async function intake_finding_for(e: parse.AnyExec): Promise<Finding> {
  // Initialize our counts
  const counts = {
    passed: 0,
    failed: 0,
    not_reviewed: 0,
    not_applicable: 0,
    profile_error: 0
  };

  // Count each control ----- we'll get to this later, haha.
  console.warn("Findings are not yet properly counted");
  return Finding.create({ ...counts });
}

export async function intake_waiver_data(
  c: schemas_1_0.ExecJSON.ControlWaiverData
): Promise<WaiverDatum> {
  return WaiverDatum.create({
    justification: c.justification,
    run: c.run,
    skipped_due_to_waiver: c.skipped_due_to_waiver ? true : false,
    message: c.message
  });
}
