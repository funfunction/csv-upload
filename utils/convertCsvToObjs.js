
/**
@func
transform a csv file format into a two-dimensional arr

@notes
index 0 will be the column headers

@tsks
handle escaped commas

@dependencies
replaceAll requires Node v15.x

@param {string} csvStr
@return {string[][]}
*/
const csvToArr2 = csvStr => csvStr.trim().split("\n").map(line => line.split(",").map(cell => cell.trim().replaceAll("\"", "")));





/**
@func
transform a csv file format into an array of objects

@param {string} csvStr
@return {object[]}
*/
export const convertCsvToObjs = csvStr => {
  const a = csvToArr2(csvStr);
  const f = []; //final output

  for (let i = 0; i < a.length; i++) {
    if (i === 0) {
      continue; //skip first row of column names
    }
    const o = {};
    for (let j = 0; j < a[0].length; j++) {
      o[a[0][j]] = a[i][j];
    }
    f.push(o);
  }
  return f;
};

//@tests
//fixture data:
// const csvStr_fixture = `"extra_col", "UUID", "VIN (alphanumerical vehicle id)", "Make", "Model", "Mileage", "Year", "Price", "Zip Code", "Create Date", "Update Date"
// "extra_col_01","UUID_01", "VIN_01", "Make_01", "Model_01", "Mileage_01", "Year_01", "Price_01", "Zip Code_01", "Create Date_01", "Update Date_01"
// "extra_col_02","UUID_02", "VIN_02", "Make_02", "Model_02", "Mileage_02", "Year_02", "Price_02", "Zip Code_02", "Create Date_02", "Update Date_02"
// "extra_col_03","UUID_03", "VIN_03", "Make_03", "Model_03", "Mileage_03", "Year_03", "Price_03", "Zip Code_03", "Create Date_03", "Update Date_03"
// `;

// console.log(csvToObjs(csvStr_fixture));
/*


@output

[
  {
    extra_col: 'extra_col_01',
    UUID: 'UUID_01',
    'VIN (alphanumerical vehicle id)': 'VIN_01',
    Make: 'Make_01',
    Model: 'Model_01',
    Mileage: 'Mileage_01',
    Year: 'Year_01',
    Price: 'Price_01',
    'Zip Code': 'Zip Code_01',
    'Create Date': 'Create Date_01',
    'Update Date': 'Update Date_01'
  },
  {
    extra_col: 'extra_col_02',
    UUID: 'UUID_02',
    'VIN (alphanumerical vehicle id)': 'VIN_02',
    Make: 'Make_02',
    Model: 'Model_02',
    Mileage: 'Mileage_02',
    Year: 'Year_02',
    Price: 'Price_02',
    'Zip Code': 'Zip Code_02',
    'Create Date': 'Create Date_02',
    'Update Date': 'Update Date_02'
  },
  {
    extra_col: 'extra_col_03',
    UUID: 'UUID_03',
    'VIN (alphanumerical vehicle id)': 'VIN_03',
    Make: 'Make_03',
    Model: 'Model_03',
    Mileage: 'Mileage_03',
    Year: 'Year_03',
    Price: 'Price_03',
    'Zip Code': 'Zip Code_03',
    'Create Date': 'Create Date_03',
    'Update Date': 'Update Date_03'
  }
]


*/
