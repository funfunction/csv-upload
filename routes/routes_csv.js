import { mgObj } from "@root/db/src/mongodb/agg/utilAgg";
import mgInsertMany from "@root/db/src/mongodb/mgInsertMany";
import { processCsvData } from "@root/db_queries/processCsvData";
import { logStartRoutePost } from "@root/mid-libs/bl/loggers/utilLogExpress";
import { isAnyEmptyStr } from "@root/mid-libs/bl/utilEmpty";
import { isNil } from "@root/mid-libs/bl/utilTypeChecker";
import express from "express";
import { dbEnum, collEnum, apiEnum } from "../utils/enums";

const app = express.Router(); // const router = express.Router();
export default app;

/**
@routePost

*/
app.post(apiEnum.api_insert__provider_csv, async (req, res) => {
  logStartRoutePost(apiEnum.api_insert__provider_csv);

  const { csvData, provider_name } = req.body;

  //#guard
  if (isAnyEmptyStr({ provider_name, csvData })) {
    return res.status(400).json([{ error: "One or more of the required parameters were not provided." }]);
  }


  const config = await mgObj(dbEnum.z_providersDb, collEnum.providerConfigsColl,
    { $match: { provider_name } }
  );
  if (isNil(config)) {
    return res.status(400).json([{ error: "Please set up your configuration file first before uploading a csv file." }]);
  }

  const csvProcessed = processCsvData(csvData, config);
  if (isNil(csvProcessed)) {
    return res.status(400).json([{ error: "The csv file failed to process, likely due to a csv format issue." }]);
  }

  const insertResp = await mgInsertMany(dbEnum.z_providersDb, collEnum.csvFilesColl, csvProcessed);
  if (isNil(insertResp)) {
    return res.status(400).json([{ error: "The csv file failed to insert into the database." }]);
  }

  return res.json({ message: "The upload of the csv file has completed successfully." });
});
