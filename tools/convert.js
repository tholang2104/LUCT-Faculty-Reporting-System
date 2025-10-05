const fs = require('fs');
const xlsx = require('xlsx');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Usage: node convert.js <inputFile> <outputFormat>');
    process.exit(1);
}

const [inputFile, outputFormat] = args;
const workbook = xlsx.readFile(inputFile);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

if (outputFormat === 'csv') {
    const csv = xlsx.utils.sheet_to_csv(sheet);
    fs.writeFileSync('output.csv', csv);
    console.log('Converted to output.csv');
} else if (outputFormat === 'json') {
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    console.log('Converted to output.json');
} else if (outputFormat === 'xlsx') {
    const newWB = xlsx.utils.book_new();
    const newSheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newWB, newSheet, 'Sheet1');
    xlsx.writeFile(newWB, 'output.xlsx');
    console.log('Converted to output.xlsx');
} else {
    console.log('Unsupported format. Use csv, json, or xlsx.');
}
