const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define a function to convert HTML files to JSON objects
let convertHTMLToJSON = (directoryPath) => {
  const jsonResults = [];

  // Create an "output" folder if it doesn't exist
  const outputFolderPath = path.join(directoryPath, 'output');
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  // Read all HTML files in the specified directory
  const files = fs.readdirSync(directoryPath);

  // Iterate through each HTML file
  files.forEach((filename) => {
    if (filename.endsWith('.html')) {
      const filePath = path.join(directoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const $ = cheerio.load(fileContents);
      const tableRows = $('table.waffle tbody tr');
      const rows = [];
      const headerRow = $(tableRows[0]).find('td').map((index, element) => $(element).text().trim());

      tableRows.each((index, element) => {
        if (index !== 0) { 
          const columns = $(element).find('td');
          const dataObject = {};

          columns.each((colIndex, colElement) => {
            const key = headerRow[colIndex];
            const value = $(colElement).text().trim();

            if(key !== value ) {

              dataObject[key] = value;
            }
          });


          if (!isMatchingKeysAndValues(dataObject)) {
            rows.push(dataObject);
          }
        }
      });

      const jsonResult = {
        data: rows,
      };



  let cleanedFilename = path
    .basename(filename, '.html')
    .toLowerCase()
    .replace(/[\s+]/g, '_')
    .replace(/[^\w\s]/g, '') 
    .replace(/_+/g, '_');

  if(cleanedFilename.slice(cleanedFilename.length -1 , cleanedFilename.length)  === '_') {
    cleanedFilename = cleanedFilename.slice(0 , cleanedFilename.length -1)
  }
  
  
  let outputFilename = `${cleanedFilename}.json`;
  const outputPath = path.join(outputFolderPath, outputFilename);
      fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2));
      jsonResults.push(outputPath);
    }
  });

  return jsonResults;
}

let isMatchingKeysAndValues = (obj) => {
  return Object.keys(obj).every((key) => obj[key] === key || obj[key] === '');
}

if (process.argv.length < 3 || process.argv.length >= 4) {
  console.error('Usage: node mrtHtmlToJson.js <directory>');
  process.exit(1);
}

//runner
const directoryPath = process.argv[2];
const result = convertHTMLToJSON(directoryPath);

// Output the paths of the generated JSON files
console.log('Generated JSON files:');
result.forEach((filePath) => {
  console.log(filePath);
});
