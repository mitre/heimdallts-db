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
import { ControlResultStatus } from "inspecjs/dist/generated_parsers/exec-json";


export function convert_execution(
    db_eval: Evaluation
): schemas_1_0.ExecJSON.Execution {
    // Check we have required info (at this level)
    //mandate(db_eval, "evaluations_profiles");
    //mandate(db_eval.getDataValue('statistic'), "statistic");
    //mandate(db_eval, "platform");
    mandate(db_eval, "version");

    // Convert the profiles
    let profile_list = db_eval.getDataValue('profiles');
    let raw_profiles = profile_list ? profile_list :[]
    let profiles: schemas_1_0.ExecJSON.Profile[] = raw_profiles.map(p =>
        convert_exec_profile(p, db_eval.id)
    );

    //let profiles: schemas_1_0.ExecJSON.Profile[] = [];

    // Done!
    let result: schemas_1_0.ExecJSON.Execution = {
        platform: convert_platform(db_eval.getDataValue('platform')!),
        statistics: convert_statistics(db_eval.getDataValue('statistic')!),
        version: db_eval.version!,
        profiles,
    };
    return result;
}

function convert_platform(
    db_platform: Platform
): schemas_1_0.ExecJSON.Execution["platform"] {
    mandate(db_platform, "name");
    mandate(db_platform, "release");
    // mandate(db_platform, "target_id")
    console.log("db_platform: " + db_platform);
    return {
        name: db_platform.name!,
        release: db_platform.release!,
        target_id: "NOT_DB_SUPPORTED", // TODO: Figure this one out
    };
}

// Since we store duration as string but inspecjs expects a number (which should maybe be reconsidered...?), need this
export function convert_statistics(
    db_statistics: Statistic
): schemas_1_0.ExecJSON.Execution["statistics"] {
    mandate(db_statistics, "duration");
    // There's nothing else!
    console.log("db_statistics.duration: " + db_statistics.duration);
    return {
        duration: Number.parseFloat(db_statistics.duration!),
    };
}

export function convert_exec_profile(
    db_profile: Profile,
    eval_id?: number
): schemas_1_0.ExecJSON.Profile {
    // Mandate
    mandate(db_profile, "name");
    mandate(db_profile, "sha256");

    console.log("profile: " + db_profile.name + ", eval_id: " + eval_id);
    // Convert the controls
    let control_list = db_profile.getDataValue('controls');
    let raw_controls = control_list ? control_list : [];
    let controls: schemas_1_0.ExecJSON.Control[] = raw_controls.map(c =>
        convert_exec_control(c, eval_id)
    );
    //let controls: schemas_1_0.ExecJSON.Control[] = [];

    return {
        attributes: [], // TODO: These aren't in the DB in proper place?!?! db_profile.
        groups: convert_groups(db_profile.getDataValue('groups')!),
        name: db_profile.name!,
        sha256: db_profile.sha256!,
        supports: convert_supports(db_profile.getDataValue('supports')!),
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
        controls,
    };
}

function convert_groups(
    db_groups: Group[]
): schemas_1_0.ExecJSON.Profile["groups"] {
    if (db_groups == null) {
        return [];
    } else {
        return db_groups.map(g => {
            mandate(g, "controls");
            mandate(g, "control_id");

            return {
                id: g.control_id!,
                controls: g.controls!,
                title: g.title,
            };
        });
    }
}


function convert_supports(
    db_supports: Support[]
): schemas_1_0.ExecJSON.Profile["supports"] {
    if (db_supports == null) {
        return [];
    } else {
        return db_supports.map(s => {
            return {
                // TODO: Fix this entirely. It's unclear how the current DB representation correlates to the actual JSON data.
                // Rob will probably know but he was offline when I encountered this.
                platform: s.value,
            };
        });
    }
}

export function convert_exec_control(
    db_control: Control,
    eval_id?: number
): schemas_1_0.ExecJSON.Control {
    // Mandates
    mandate(db_control, "id");
    mandate(db_control, "impact");
    //mandate(db_control, "source_location");

    let eval_num = Number(eval_id!);
    console.log("control: " + db_control.control_id + ", eval_id: " + eval_num);
    // Fetch our results, properly
    // TODO: Make this a more efficient operation.
    let results_list = db_control.getDataValue('results');
    let raw_results = results_list ? results_list : [];
    console.log("raw_results: " + JSON.stringify(raw_results[0]));
    let filtered_results = raw_results.filter(
        r => {
            return (r.evaluation_id == eval_id);
        }
    );
    let results = convert_results(filtered_results);
    //let results: schemas_1_0.ExecJSON.Control["results"] = [];


    // Reformatting
    return {
        id: db_control.control_id!,
        impact: db_control.impact,
        refs: convert_refs(db_control.getDataValue('refs')),
        source_location: db_control.source_location!,
        tags: convert_control_tags(db_control.getDataValue('tags')),
        code: db_control.code,
        desc: db_control.desc,
        descriptions: convert_descriptions(db_control.getDataValue('descriptions')),
        title: db_control.title,
        //waiver_data: convert_waiver(db_control.waiver_data), // TODO: This REALLY shoudn't be coming from here
        results,
    };
}

function convert_refs(
    db_refs: Ref[]
): schemas_1_0.ExecJSON.Control["refs"] {
    // Really just gotta remove nulls, because for some reason those are not accepted by the schema
    if (db_refs == null) {
        return [];
    } else {
        return db_refs.map(r => {
            return {
                ref: r.ref || undefined,
                url: r.url || undefined,
                uri: r.uri || undefined,
            };
        });
    }
}

function convert_descriptions(
    db_descriptions: Description[]
): schemas_1_0.ExecJSON.Control["descriptions"] {
    if (db_descriptions == null) {
        return [];
    } else {
        return db_descriptions.map(desc => {
            // Mandates. We will almost definitely relax this later
            mandate(desc, "label");
            mandate(desc, "data");

            return { label: desc.label!, data: desc.data! };
        });
    }
}

function convert_control_tags(
    db_tags: Tag[]
): schemas_1_0.ExecJSON.Control["tags"] {
    // Really just gotta remove nulls, because for some reason those are not accepted by the schema
    if (db_tags == null) {
        return [];
    } else {
        return db_tags.map(r => {
            return {
                content: r.content || undefined,
            };
        });
    }
}

function convert_results(
    db_results: Result[]
): schemas_1_0.ExecJSON.Control["results"] {
    return db_results.map(r => {
        // Mandatus!
        mandate(r, "code_desc");
        mandate(r, "start_time");
        // TODO: Figure out why status isn't required. That seems... important
        let start_date = new Date(r.start_time);
        return {
            evaluation_id: r.evaluation_id,
            backtrace: r.backtrace,
            code_desc: r.code_desc!,
            exception: r.exception,
            message: r.message,
            resource: r.resource,
            run_time: r.run_time,
            skip_message: r.skip_message,
            start_time: start_date!.toDateString(),
            status: r.status as ControlResultStatus | null,
        };
    });
}

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

