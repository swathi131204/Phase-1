const fs = require('fs');
const filePath = 'output.txt';
const contentToAppend = '\nMore content here.';

fs.appendFile(filePath, contentToAppend, (err) => {
    if (err) {
        console.error('Error appending to file:', err);
    } else {
        console.log('Content successfully appended!');
    }
});
