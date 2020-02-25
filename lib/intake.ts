import { schemas_1_0, parse } from "inspecjs";
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
import { Depend } from "./models/Depend";
import { Input } from "./models/Input";
import { Finding } from "./models/Finding";
import { WaiverDatum } from "./models/WaiverDatum";
import { SourceLocation } from "./models/SourceLocation";

/* TODO: Integrate transactions */

export async function intake_evaluation(
  evaluation: parse.AnyExec
): Promise<Evaluation> {
  // Create it, and assign its top-level attributes
  const db_eval = await Evaluation.create({
    version: evaluation.version
  });

  // Build the outer Evaluation scaffolding data
  const platform = await intake_platform(evaluation.platform, db_eval);
  const statistic = await intake_statistics(evaluation.statistics, db_eval);
  const finding = await intake_finding_for(evaluation, db_eval);

  // Link them up
  await db_eval.$set("platform", platform);
  await db_eval.$set("statistic", statistic);
  await db_eval.$set("finding", finding);

  // Convert the profiles
  const raw_profiles = evaluation.profiles;

  // For each profile:
  for (const raw_profile of raw_profiles) {
    // Fetch or convert it
    const db_profile = await fetch_or_create(raw_profile);

    // Establish relation to the evaluation
    await db_eval.$add("profiles", db_profile);

    // Handle inputs
    await intake_inputs_from(raw_profile, db_profile, db_eval);

    // Handle depends
    if (raw_profile.depends) {
      await intake_dependencies(raw_profile.depends, db_profile, db_eval);
    }

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
        await intake_waiver_data(raw_control.waiver_data, db_control, db_eval);
      }

      // Process each result and link it
      await intake_results(raw_control.results, db_control, db_eval);
    }

    await db_profile.save();
  }

  // Save once more for good measure
  await db_eval.save();
  return db_eval;
}
/** Creates a DB record for the given profile, but with all run-specific information stripped.
 * Use this for the first-time intake of a given profile
 */
export async function intake_exec_profile_no_results(
  profile: schemas_1_0.ExecJSON.Profile
): Promise<Profile> {
  // Initialize our profile with top level fields
  const db_profile = await Profile.create({
    name: profile.name,
    sha256: profile.sha256,
    copyright: profile.copyright || undefined,
    copyright_email: profile.copyright_email || undefined,
    //description: profile.description || undefined,
    license: profile.license || undefined,
    maintainer: profile.maintainer || undefined,
    summary: profile.summary || undefined,
    title: profile.title || undefined,
    version: profile.version || undefined
    // inspec_version: null, // TODO: We should track this in Evaluation platform
    // status: profile.status || undefined, // TODO: Ditto above, esp. because this can change on a per-execution basis
    // parent_profile: null, // TODO: We should track this, and probably also track overlays in a separate record table
    // skip_message: null, // TODO: Should eventually be moved to a separate record, on candidate key (Evaluation, Overlay)
  });

  // Convert the controls, etc.
  for (const c of profile.controls) {
    await intake_exec_control_no_results(c, db_profile);
  }
  await intake_groups(profile.groups, db_profile);
  await intake_supports(profile.supports, db_profile);

  await db_profile.save();
  return db_profile;
}

/** Creates a DB record for the given control.
 * This does NOT include results!
 */
export async function intake_exec_control_no_results(
  control: schemas_1_0.ExecJSON.Control,
  for_profile: Profile
): Promise<Control> {
  // Init top level fields
  const db_control = await Control.create({
    control_id: control.id,
    impact: control.impact,
    code: control.code,
    desc: control.desc,
    title: control.title,
    profile_id: for_profile.id
  });

  // Convert our singular subfields
  const source_location = await intake_source_location(
    control.source_location,
    db_control
  );
  await db_control.$set("source_location", source_location);

  // Convert our multiple subfields
  for (const r of control.refs) {
    await intake_ref(r, db_control);
  }
  await intake_control_tags(control.tags, db_control);
  if (control.descriptions) {
    await intake_descriptions(control.descriptions, db_control);
  }

  await db_control.save();
  return db_control;
}

/** Creates a DB record for the given control tag.
 */
export async function intake_control_tags(
  tags: schemas_1_0.ExecJSON.Control["tags"],
  for_control: Control
): Promise<Tag[]> {
  return Tag.bulkCreate(
    Object.keys(tags).map(key => ({
      name: key,
      value: tags[key],
      tagger_type: "control",
      tagger_id: for_control.id
    }))
  );
}

/** Creates a DB record for the given dependency.
 */
export async function intake_dependencies(
  dependencies: schemas_1_0.ExecJSON.ProfileDependency[],
  for_profile: Profile,
  for_evaluation: Evaluation
): Promise<Depend[]> {
  return Depend.bulkCreate(
    dependencies.map(dep => ({
      name: dep.name,
      path: dep.path,
      url: dep.url,
      status: dep.status,
      git: dep.git,
      branch: dep.branch,
      profile_id: for_profile.id,
      evaluation_id: for_evaluation.id
      // compliance: dep.compliance, // TODO: Add compliance
      // supermarket: dep.supermarket, // TODO: Add supermarket
    }))
  );
}

/** Creates a DB record for the given descripion
 * Does not save.
 */
export async function intake_descriptions(
  descriptions: schemas_1_0.ExecJSON.ControlDescription[],
  for_control: Control
): Promise<Description[]> {
  return Description.bulkCreate(
    descriptions.map(desc => ({
      label: desc.label,
      data: desc.data,
      control_id: for_control.id
    }))
  );
}

/** Creates a DB record for the given Finding.
 * Since findings aren't actually in the schema usually, we generate one here
 * Does not save.
 */
export async function intake_finding_for(
  evaluation: parse.AnyExec,
  for_evaluation: Evaluation
): Promise<Finding> {
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
  return Finding.create({ ...counts, evaluation_id: for_evaluation.id });
}

/** Creates a DB record for the given group.
 */
export async function intake_groups(
  groups: schemas_1_0.ExecJSON.ControlGroup[],
  for_profile: Profile
): Promise<Group[]> {
  return Group.bulkCreate(
    groups.map(group => ({
      control_id: group.id,
      controls: group.controls,
      title: group.title,
      profile_id: for_profile.id
    }))
  );
}

/** Given a profile, uploads its inputs and returns their DB model references.
 */
export async function intake_inputs_from(
  raw_profile: schemas_1_0.ExecJSON.Profile,
  for_profile: Profile,
  for_evaluation: Evaluation
): Promise<Input[]> {
  return Input.bulkCreate(
    raw_profile.attributes.map(attribute => ({
      name: attribute["name"],
      options: attribute["options"],
      profile_id: for_profile.id,
      evaluation_id: for_evaluation.id
    }))
  );
}

/** Creates a DB record for the given platform.
 */
export async function intake_platform(
  platform: schemas_1_0.ExecJSON.Platform,
  for_evaluation: Evaluation
): Promise<Platform> {
  return Platform.create({
    name: platform.name,
    release: platform.release,
    evaluation_id: for_evaluation.id
  });
}

/** Creates a DB record for the given ref.
 */
export async function intake_ref(
  ref: schemas_1_0.ExecJSON.Reference,
  for_control: Control
): Promise<Ref> {
  // Really just gotta remove nulls, because for some reason those are not accepted by the schema
  return Ref.create({
    ref: JSON.stringify(ref.ref) || undefined,
    url: ref.url || undefined,
    uri: ref.uri || undefined,
    control_id: for_control.id
  });
}

/** Creates a DB record for the given result.
 */
export async function intake_results(
  results: schemas_1_0.ExecJSON.ControlResult[],
  for_control: Control,
  for_evaluation: Evaluation
): Promise<Result[]> {
  return Result.bulkCreate(
    results.map(r => ({
      backtrace: r.backtrace,
      code_desc: r.code_desc,
      exception: r.exception,
      message: r.message,
      resource: r.resource,
      run_time: r.run_time,
      skip_message: r.skip_message,
      start_time: new Date(r.start_time),
      status: r.status,
      control_id: for_control.id,
      evaluation_id: for_evaluation.id
    }))
  );
}

/** Creates a DB record for the given source location.
 */
export async function intake_source_location(
  sl: schemas_1_0.ExecJSON.SourceLocation,
  for_control: Control
): Promise<SourceLocation> {
  return SourceLocation.create({
    line: sl.line,
    ref: sl.ref,
    control_id: for_control.id
  });
}

/** Creates a DB record for the given statistic.
 * Does not save.
 */
export async function intake_statistics(
  statistics: schemas_1_0.ExecJSON.Statistics,
  for_evaluation: Evaluation
): Promise<Statistic> {
  return Statistic.create({
    duration: `${statistics.duration}`,
    evaluation_id: for_evaluation.id
  });
}

/** Creates a DB record for the given support.
 * Does not save.
 */
export async function intake_supports(
  supports: schemas_1_0.ExecJSON.SupportedPlatform[],
  for_profile: Profile
): Promise<Support[]> {
  return Support.bulkCreate(
    supports.map(support => ({
      os_name: support["os-name"],
      os_family: support["os-family"],
      platform: support.platform,
      platform_family: support["platform-family"],
      platform_name: support["platform-name"],
      release: support["release"],
      profile_id: for_profile.id
      // inspec_version: support["???"]
    }))
  );
}

/** Creates a DB record for the given waiver data.
 */
export async function intake_waiver_data(
  wd: schemas_1_0.ExecJSON.ControlWaiverData,
  for_control: Control,
  for_evaluation: Evaluation
): Promise<WaiverDatum> {
  return WaiverDatum.create({
    justification: wd.justification,
    run: wd.run,
    skipped_due_to_waiver: wd.skipped_due_to_waiver ? true : false,
    message: wd.message,
    control_id: for_control.id,
    evaluation_id: for_evaluation.id
  });
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
      console.log(`Building a new profile for ${profile.name}`);
      return intake_exec_profile_no_results(profile);
    }
  });
}
