const fs = require('fs').promises;
const path = require('path');

async function readDirectoryRecursive(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            console.log(fullPath);
            if (entry.isDirectory()) {
                await readDirectoryRecursive(fullPath); 
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
}


const targetDirectory = path.join(__dirname, 'testDirectory'); 
readDirectoryRecursive(targetDirectory);
