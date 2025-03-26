const fs = require('fs');

const data = "Hello, Node.js!";
const filePath = "output.txt";

fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("File successfully written!");
    }
});
