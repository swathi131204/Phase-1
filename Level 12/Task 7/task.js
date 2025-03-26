const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'new_folder');


if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log('Directory "new_folder" created successfully!');
        }
    });
} else {
    console.log('Directory "new_folder" already exists.');
}
