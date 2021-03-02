import { lpromise } from "@root/mid-libs/bl/loggers/consolelog";
import axios from "axios";

/**
@file
test the api with axios
Running this file will send the fixture example data to the express endpoint;
- the data will be transformed into an array of object;
- then inserted into mongoDB.
- a success message will then be returned
- or the descriptive error message

@dependency
for localhost:3333 testing,
- make sure the express-csv.js is running,
- by starting the local express server with...
npm run dev_express_csv_prod

*/



const csvStr_fixture = `"extra_col", "UUID", "VIN (alphanumerical vehicle id)", "Make", "Model", "Mileage", "Year", "Price", "Zip Code", "Create Date", "Update Date"
"extra_col_01","UUID_01", "VIN_01", "Make_01", "Model_01", "Mileage_01", "Year_01", "Price_01", "Zip Code_01", "Create Date_01", "Update Date_01"
"extra_col_02","UUID_02", "VIN_02", "Make_02", "Model_02", "Mileage_02", "Year_02", "Price_02", "Zip Code_02", "Create Date_02", "Update Date_02"
"extra_col_03","UUID_03", "VIN_03", "Make_03", "Model_03", "Mileage_03", "Year_03", "Price_03", "Zip Code_03", "Create Date_03", "Update Date_03"
`;




const callCsvApi = async (provider_name, csvData) => {
  // const url = "http://localhost:3333/api_insert__provider_csv";
  const url = "https://express-csv.herokuapp.com/api_insert__provider_csv";
  return (await axios.post(url, {
    csvData,
    provider_name,
  })).data;
};

//@tests
lpromise(callCsvApi("AMC", csvStr_fixture));
/*

@output
{ message: 'The upload of the csv file has completed successfully.' }


*/
