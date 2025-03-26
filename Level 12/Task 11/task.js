const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'watchedFile.txt');

console.log(`Watching for changes in: ${filePath}`);


fs.watch(filePath, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} has been ${eventType}`);
    } else {
        console.log(`A change occurred, but filename is not available.`);
    }
});
