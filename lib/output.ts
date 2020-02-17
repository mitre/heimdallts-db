import { schemas_1_0 } from "inspecjs";
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

/** A utility function which checks if the specified key is present in the object x,
 * and if not, throws an error.
 */

function mandate<T, K extends keyof T>(x: T, key: K): x is Required<T> {
  if (x[key] !== null && x[key] !== undefined) {
    return true;
  } else {
    throw new Error(`${x} is missing key '${key}`);
  }
}

export async function convert_evaluation(
  db_eval: Evaluation
): Promise<schemas_1_0.ExecJSON.Execution> {
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
  db_platform: Platform
): Promise<schemas_1_0.ExecJSON.Platform> {
  // mandate(db_platform, "target_id")
  console.log("db_platform: " + db_platform);
  return {
    name: db_platform.name,
    release: db_platform.release,
    target_id: "NOT_DB_SUPPORTED" // TODO: Figure this one out
  };
}

// Since we store duration as string but inspecjs expects a number (which should maybe be reconsidered...?), need this
export async function convert_statistics(
  db_statistics: Statistic
): Promise<schemas_1_0.ExecJSON.Statistics> {
  mandate(db_statistics, "duration");
  // There's nothing else!
  console.log("db_statistics.duration: " + db_statistics.duration);
  let dur: number | null = Number.parseFloat(db_statistics.duration);
  if (Number.isNaN(dur)) {
    dur = null;
  }
  return {
    duration: dur
  };
}

export async function convert_exec_profile(
  db_profile: Profile,
  db_eval: Evaluation
): Promise<schemas_1_0.ExecJSON.Profile> {
  // Mandate
  mandate(db_profile, "name");
  mandate(db_profile, "sha256");

  console.log("profile: " + db_profile.name);
  // Convert the controls
  const raw_controls = await db_profile.$get("controls");
  const controls: schemas_1_0.ExecJSON.Control[] = [];
  for (const c of raw_controls) {
    controls.push(await convert_exec_control(c, db_eval));
  }

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
  db_groups: Group[]
): schemas_1_0.ExecJSON.ControlGroup[] {
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
): schemas_1_0.ExecJSON.SupportedPlatform[] {
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

export async function convert_exec_control(
  db_control: Control,
  db_eval: Evaluation
): Promise<schemas_1_0.ExecJSON.Control> {
  // Mandates
  mandate(db_control, "id");
  mandate(db_control, "impact");

  // We handle this differently based on if eval id defined
  //mandate(db_control, "source_location");

  console.log("control: " + db_control.control_id);
  // Fetch our results, properly
  // TODO: Make this a more efficient operation.
  const results_list = await db_control.$get("results", {
    where: {
      evaluation_id: {
        [Op.eq]: db_eval.id
      }
    }
  });
  const results = convert_results(results_list);
  //let results: schemas_1_0.ExecJSON.Control["results"] = [];

  // Reformatting
  return {
    id: db_control.control_id,
    impact: db_control.impact,
    refs: convert_refs(await db_control.$get("refs")),
    source_location: db_control.source_location,
    tags: convert_control_tags(await db_control.$get("tags")),
    code: db_control.code,
    desc: db_control.desc,
    descriptions: convert_descriptions(await db_control.$get("descriptions")),
    title: db_control.title,
    //waiver_data: convert_waiver(db_control.waiver_data), // TODO: This REALLY shoudn't be coming from here
    results
  };
}

export function convert_refs(db_refs: Ref[]): schemas_1_0.ExecJSON.Reference[] {
  return db_refs.map(r => ({
    ref: r.ref || undefined,
    url: r.url || undefined,
    uri: r.uri || undefined
  }));
}

export function convert_descriptions(
  db_descriptions: Description[]
): schemas_1_0.ExecJSON.ControlDescription[] {
  return db_descriptions.map(desc => {
    // Mandates. We will almost definitely relax this later
    mandate(desc, "label");
    mandate(desc, "data");

    return { label: desc.label, data: desc.data };
  });
}

export function convert_control_tags(
  db_tags: Tag[]
): schemas_1_0.ExecJSON.Control["tags"] {
  const tags: schemas_1_0.ExecJSON.Control["tags"] = {};
  for (const t of db_tags) {
    const key = t.content.name;
    const value = t.content.value;
    tags[key] = value;
  }
  return tags;
}

export function convert_results(
  db_results: Result[]
): schemas_1_0.ExecJSON.ControlResult[] {
  return db_results.map(r => {
    // Mandatus!
    mandate(r, "code_desc");
    mandate(r, "start_time");
    // TODO: Figure out why status isn't required. That seems... important

    const start_date = new Date(r.start_time);
    return {
      // evaluation: r.evaluation_id,
      backtrace: r.backtrace,
      code_desc: r.code_desc,
      exception: r.exception,
      message: r.message,
      resource: r.resource,
      run_time: r.run_time,
      skip_message: r.skip_message,
      start_time: start_date.toDateString(),
      status: r.status as schemas_1_0.ExecJSON.ControlResultStatus
    };
  });
}
