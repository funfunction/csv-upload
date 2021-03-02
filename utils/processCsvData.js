import { removeKeysInObjsNotInList } from "./removeKeysInObjsNotInList";
import { convertCsvToObjs } from "./convertCsvToObjs";

/**
@func
transform csv file into an array of object,
- so we can insert it into Mongo

@typedef {{provider_name: string, columns: string[]}} configObj
@param {string} csvFile - the unprocessed csv file
@param {configObj} config
@return {object[]} - the processed csv file
*/
export const processCsvData = (csvFile, config) => {
  try {
    //guard
    const isNotValid = !csvFile || !config || !config.provider_name || !Array.isArray(config.columns) || config.columns.length === 0;
    if (isNotValid) {
      return null;
    }

    let csvObjs = convertCsvToObjs(csvFile);

    // remove keys that are not in the config file
    // i.e.: if any csv key in the csv obj is not in the config key list,
    // - remove it from the csv obj
    return removeKeysInObjsNotInList(config.columns, csvObjs);
  } catch (err) {
    console.error("processCsvData: CATCH:", err);
    return null;
  }
};

