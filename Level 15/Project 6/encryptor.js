
const crypto = require("crypto");
const fs = require("fs");        
const path = require("path");    

const algorithm = "aes-256-cbc";
const ivLength = 16; 

function getKeyFromPassword(password) {

    return crypto.createHash("sha256").update(password).digest();
}

function encryptFile(inputPath, password, outputPath) {
    const iv = crypto.randomBytes(ivLength);

    const key = getKeyFromPassword(password);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    output.write(iv);
    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
        console.log(`✅ File encrypted successfully: ${outputPath}`);
    });

    output.on("error", (err) => {
        console.error("❌ Encryption failed:", err.message);
    });
}

function decryptFile(inputPath, password, outputPath) {
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    const key = getKeyFromPassword(password);
    let iv;
    let decipher;

    input.once("readable", () => {
        iv = input.read(ivLength);

        decipher = crypto.createDecipheriv(algorithm, key, iv);

        input.pipe(decipher).pipe(output);
    });

    output.on("finish", () => {
        console.log(`✅ File decrypted successfully: ${outputPath}`);
    });

    output.on("error", (err) => {
        console.error("❌ Decryption failed:", err.message);
    });
}

const [,, command, inputFile, password, outputFile] = process.argv;

if (!command || !inputFile || !password) {
    console.log("🔐 How to use this tool:");
    console.log("  Encrypt: node encryptor.js encrypt <inputFile> <password> [outputFile]");
    console.log("  Decrypt: node encryptor.js decrypt <inputFile> <password> [outputFile]");
    process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outPath = outputFile 
    ? path.resolve(outputFile)
    : (command === "encrypt" ? inputPath + ".enc" : inputPath.replace(".enc", ".dec"));

if (command === "encrypt") {
    encryptFile(inputPath, password, outPath);
} else if (command === "decrypt") {
    decryptFile(inputPath, password, outPath);
} else {
    console.log("❌ Invalid command. Use 'encrypt' or 'decrypt'.");
}
