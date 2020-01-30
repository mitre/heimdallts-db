import { schemas_1_0 } from "inspecjs";
import { Evaluation } from "./models/Evaluation";
import { Platform } from "./models/Platform";
import { Statistic } from "./models/Statistic";


export function convert_execution(
    db_eval: Evaluation
): schemas_1_0.ExecJSON.Execution {
    // Check we have required info (at this level)
    //mandate(db_eval, "evaluations_profiles");
    //mandate(db_eval.getDataValue('statistic'), "statistic");
    //mandate(db_eval, "platform");
    mandate(db_eval, "version");

    // Convert the profiles
    //let profiles: schemas_1_0.ExecJSON.Profile[] = db_eval.evaluations_profiles.map(p =>
    //    convert_exec_profile(p, db_eval.id)
    //);

    let profiles: schemas_1_0.ExecJSON.Profile[] = [];

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

