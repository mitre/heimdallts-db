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
import { Op } from "sequelize";
import { convert_descriptions } from "./output";

/*
export async function convert_evaluation(
  eval: parse.AnyExec
): Promise<Evaluation> {
  // Check we have required info (at this level)
  // Convert the profiles
  const raw_profiles = await db_eval.$get("profiles");
  const converted_profiles: schemas_1_0.ExecJSON.Profile[] = [];
  for (const p of raw_profiles) {
    converted_profiles.push(await convert_exec_profile(p, db_eval.id));
  }

  // Done!
  const result: schemas_1_0.ExecJSON.Execution = {
    platform: await convert_platform(
      (await db_eval.$get("platform")) as Platform
    ),
    statistics: await convert_statistics(
      (await db_eval.$get("statistic")) as Statistic
    ),
    version: db_eval.version,
    profiles: converted_profiles
  };
  return result;
}

export async function convert_platform(
  db_platform: schemas_1_0.ExecJSON.Execution["platform"]
): Promise<Platform> {
  return {
    name: db_platform.name,
    release: db_platform.release,
    target_id: "NOT_DB_SUPPORTED" // TODO: Figure this one out
  };
}

// Since we store duration as string but inspecjs expects a number (which should maybe be reconsidered...?), need this
export async function convert_statistics(
  db_statistics: schemas_1_0.ExecJSON.Execution["statistics"]
): Promise<Statistic> {
  // There's nothing else!
  let dur: number | null = Number.parseFloat(db_statistics.duration);
  if (Number.isNaN(dur)) {
    dur = null;
  }
  return {
    duration: dur
  };
}

export async function convert_exec_profile(
  db_profile: schemas_1_0.ExecJSON.Profile
): Promise<Profile> {
  // Convert the controls
  const raw_controls = await db_profile.$get("controls");
  const controls: schemas_1_0.ExecJSON.Control[] = [];
  for (const c of raw_controls) {
    controls.push(await convert_exec_control(c, eval_id));
  }
  //let controls: schemas_1_0.ExecJSON.Control[] = [];

  return {
    attributes: [], // TODO: These aren't in the DB in proper place?!?! db_profile.
    groups: convert_groups(await db_profile.$get("groups")),
    name: db_profile.name,
    sha256: db_profile.sha256,
    supports: convert_supports(
      (await db_profile.$get("supports")) as Support[]
    ),
    copyright: db_profile.copyright,
    copyright_email: db_profile.copyright_email,
    depends: db_profile.depends,
    description: null, // db_profile.desc,
    inspec_version: null, // TODO: We should track this
    license: db_profile.license,
    maintainer: db_profile.maintainer,
    parent_profile: null, // TODO: We should track this, and probably also track overlays in a separate record table
    skip_message: null, // TODO: Should eventually be moved to a separate record, on candidate key (Evaluation, Overlay)
    status: db_profile.status, // TODO: Ditto above, esp. because this can change on a per-execution basis
    summary: db_profile.summary,
    title: db_profile.title,
    version: db_profile.version,
    controls
  };
}

export function convert_groups(
  db_groups: schemas_1_0.ExecJSON.Profile["groups"]
): Group[] {
  if (db_groups == null) {
    return [];
  } else {
    return db_groups.map(g => {
      return {
        id: g.control_id,
        controls: g.controls,
        title: g.title
      };
    });
  }
}

export function convert_supports(
  db_supports: Support[]
): schemas_1_0.ExecJSON.Profile["supports"] {
  if (db_supports == null) {
    return [];
  } else {
    return db_supports.map(s => {
      return {
        // TODO: Fix this entirely. It's unclear how the current DB representation correlates to the actual JSON data.
        // Rob will probably know but he was offline when I encountered this.
        platform: s.value
      };
    });
  }
}

export function convert_exec_control(
  control: schemas_1_0.ExecJSON.Control
): Control {
  // Convert our subfields
  const results = control.results.map(convert_result);
  const refs = control.refs.map(convert_ref);
  const tags = convert_control_tags(control.tags);
  let descriptions: Description[] = [];
  if(control.descriptions) {
    const descriptions = convert_descriptions(control.descriptions);
  }

  // Reformatting
  return new Control({
    control_id: control.id,
    impact: control.impact,
    refs: refs,
    source_location: control.source_location,
    tags: tags,
    code: control.code,
    desc: control.desc,
    descriptions: convert_descriptions(await db_control.$get("descriptions")),
    title: db_control.title,
    //waiver_data: convert_waiver(db_control.waiver_data), // TODO: This REALLY shoudn't be coming from here
    results
  });
}

export function convert_ref(ref: schemas_1_0.ExecJSON.Reference): Ref {
  // Really just gotta remove nulls, because for some reason those are not accepted by the schema
  return new Ref({
    ref: ref.ref || undefined,
    url: ref.url || undefined,
    uri: ref.uri || undefined
  });
}

export function convert_description(
  desc: schemas_1_0.ExecJSON.ControlDescription
): Description {
  return new Description({ label: desc.label, data: desc.data });
}

export function convert_control_tags(
  tags: schemas_1_0.ExecJSON.Control["tags"]
): Tag[] {
  const result: Tag[] = [];
  for (const key in tags) {
    result.push(
      new Tag({
        name: key,
        value: tags[key]
      })
    );
  }
  return result;
}

export function convert_result(r: schemas_1_0.ExecJSON.ControlResult): Result {
  // Parse the date if possible
  const date = new Date(r.start_time);

  return new Result({
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

*/
