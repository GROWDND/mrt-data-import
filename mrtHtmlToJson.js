const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define a function to convert HTML files to JSON objects
function convertHTMLToJSON(directoryPath, fileType) {
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

      // Load the HTML content into Cheerio
      const $ = cheerio.load(fileContents);

      // Find the table within the HTML
      const tableRows = $('table.waffle tbody tr');

      const legalRequirements = [];

      // Get the header row dynamically
      const headerRow = $(tableRows[0]).find('td').map((index, element) => $(element).text().trim());

      // Iterate through the table rows and extract data
      tableRows.each((index, element) => {
        if (index !== 0) { // Skip the header row
          const columns = $(element).find('td');
          const legalRequirement = {};

          columns.each((colIndex, colElement) => {
            const key = headerRow[colIndex];
            const value = $(colElement).text().trim();

            if(key !== value ) {

              legalRequirement[key] = value;
            }
          });

          // Check if all fields are not empty and do not match their respective keys
          if (fileType !== '' && !isMatchingKeysAndValues(legalRequirement)) {
            legalRequirements.push(legalRequirement);
          }
        }
      });

      const jsonResult = {
        data: legalRequirements,
      };


// Generate the output JSON filename based on the input filename and fileType
let cleanedFilename = path
  .basename(filename, '.html')
  .toLowerCase()
  .replace(/[\s+]/g, '_')
  .replace(/[^\w\s]/g, '') // Remove special characters
  .replace(/_+/g, '_') // Replace multiple underscores with a single underscore
  let outputFilename;

  if(!fileType){
     outputFilename = `${cleanedFilename}.json`;
  } else {
     outputFilename = `${cleanedFilename}_${fileType}.json`;
  }

const outputPath = path.join(outputFolderPath, outputFilename);



      // Write the JSON result to the output file
      fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2));

      jsonResults.push(outputPath);
    }
  });

  return jsonResults;
}

// Function to check if all fields do not match their respective keys
function isMatchingKeysAndValues(obj) {
  return Object.keys(obj).every((key) => obj[key] === key || obj[key] === '');
}

// Check if the correct number of arguments are provided
if (process.argv.length < 3 || process.argv.length > 4) {
  console.error('Usage: node mrtHtmlToJson.js <directory> [fileType]');
  process.exit(1);
}

const directoryPath = process.argv[2];
const fileType = process.argv[3];

const result = convertHTMLToJSON(directoryPath, fileType);

// Output the paths of the generated JSON files
console.log('Generated JSON files:');
result.forEach((filePath) => {
  console.log(filePath);
});
