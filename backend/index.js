const XLSX = require('xlsx');

function splitList(lst, n) {
  // Split a list into sublists containing n elements.
  const result = [];
  for (let i = 0; i < lst.length; i += n) {
    result.push(lst.slice(i, i + n));
  }
  return result;
}

function readFoodCO2EmissionFile() {
  const workbook = XLSX.readFile('FoodCarbon.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  const result = {};

  data.forEach(row => {
    //console.log('Processing row:', row);
    //console.log('Category:', category);
    if (row['category'] !== undefined) {
      const commodityData = [
        row['commodity'],
        row['miles'],
        row['gram'],
        row['production'],
        row['transport']
      ];
      //console.log('Commodity data:', commodityData);

      if (result[row['category'].toLowerCase()]) {
        result[row['category'].toLowerCase()].push(commodityData);
        
      } else {
        result[row['category'].toLowerCase()] = [commodityData];
      }
    }
  });

  return result;
}

// Call the function to read the Excel file and get the resulting dictionary
const foodCO2EmissionData = readFoodCO2EmissionFile();
console.log(foodCO2EmissionData);

