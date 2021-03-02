import { lpromise } from "@root/mid-libs/bl/loggers/consolelog";
import { mgObj } from "@root/db/src/mongodb/agg/utilAgg";
import mgInsertOne from "@root/db/src/mongodb/mgInsertOne";
import { dbEnum, collEnum } from "../utils/enums";


/*
a.
seed a provider config doc into a mongodb collection

*/
const insertProviderConfig = async () => {

  const config_01 = {
    provider_name: "AMC",
    columns: [
      "UUID",
      "VIN (alphanumerical vehicle id)",
      "Make",
      "Model",
      "Mileage",
      "Year",
      "Price",
      "Zip Code",
      "Create Date",
      "Update Date",
    ],
  };

  await mgInsertOne(dbEnum.z_providersDb, collEnum.providerConfigsColl, config_01);
};

lpromise(insertProviderConfig());




//b.
//query to retrieve the provider_config, ensuring it's there
// lpromise(mgObj(dbEnum.z_providersDb, collEnum.providerConfigsColl,
//   { $match: { provider_name: "AMC" } }
// ));

/*

@output

{
  _id: 603c835c9bdcbe2bf43f29f6,
  provider_name: 'AMC',
  columns: [
    'UUID',
    'VIN (alphanumerical vehicle id)',
    'Make',
    'Model',
    'Mileage',
    'Year',
    'Price',
    'Zip Code',
    'Create Date',
    'Update Date'
  ]
}

*/
