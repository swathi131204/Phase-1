const fs = require('fs');
const path = require('path');
const os = require('os');

function createTempFiles() {
    fs.mkdtemp(path.join(os.tmpdir(), 'tempDir-'), (err, tempDir) => {
        if (err) {
            return console.error('Error creating temp directory:', err);
        }
        console.log('Temporary directory created:', tempDir);
        
    
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt'];
        
    
        fileNames.forEach((fileName, index) => {
            const filePath = path.join(tempDir, fileName);
            const fileContent = `This is file ${index + 1} in ${tempDir}`;
            
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    return console.error(`Error writing to ${filePath}:`, err);
                }
                console.log('File created:', filePath);
            });
        });
    });
}

createTempFiles();
