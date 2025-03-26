const fs = require('fs');
const path = require('path');

function listDirectoryContents() {
    const currentDir = __dirname;
    
    fs.readdir(currentDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        
        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory()) {
                console.log(`[DIR]  ${file}`);
            } else {
                console.log(`[FILE] ${file}`);
            }
        });
    });
}

listDirectoryContents();
