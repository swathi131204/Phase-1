const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'example.txt');


fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error(`Error retrieving file stats: ${err.message}`);
        return;
    }
    
    console.log(`File: ${filePath}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
