const fs = require('fs');
const path = require('path');


const fileName = 'testFile.txt';
const filePath = path.join(__dirname, fileName);


fs.writeFileSync(filePath, 'This is a test file.');
console.log(`${fileName} has been created.`);


function deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
                return;
            }
            console.log(`${fileName} has been deleted successfully.`);
        });
    } else {
        console.log(`File not found: ${fileName}`);
    }
}


deleteFile(filePath);