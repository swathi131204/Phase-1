const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'largeFile.txt'); 
const destinationFile = path.join(__dirname, 'largeFile_copy.txt'); 

const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destinationFile);

let totalSize = fs.statSync(sourceFile).size; 
let copiedSize = 0;

console.log('Copying started...');

readStream.on('data', (chunk) => {
    copiedSize += chunk.length;
    let progress = ((copiedSize / totalSize) * 100).toFixed(2);
    console.log(`Progress: ${progress}%`);
});

readStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});

writeStream.on('error', (err) => {
    console.error('Error writing the file:', err);
});

writeStream.on('finish', () => {
    console.log('Copying completed successfully.');
});

readStream.pipe(writeStream);
