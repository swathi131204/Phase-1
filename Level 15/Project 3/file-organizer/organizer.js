const fs = require("fs");
const path = require("path");

const FILE_CATEGORIES = {
    images: [".jpg", ".jpeg", ".png", ".gif"],
    documents: [".pdf", ".doc", ".docx", ".txt"],
};

function getCategory(fileExtension) {
    for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
        if (extensions.includes(fileExtension)) {
            return category;
        }
    }
    return "others"; 
}

function organizeFiles(directory) {
    if (!fs.existsSync(directory)) {
        console.log("❌ Directory does not exist.");
        return;
    }

    const files = fs.readdirSync(directory);
    let report = [];

    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.lstatSync(filePath).isFile()) {
            const fileExtension = path.extname(file).toLowerCase();
            const category = getCategory(fileExtension);
            const categoryPath = path.join(directory, category);

            if (!fs.existsSync(categoryPath)) {
                fs.mkdirSync(categoryPath);
            }

            const newFilePath = path.join(categoryPath, file);
            fs.renameSync(filePath, newFilePath);
            report.push(`📂 Moved: ${file} → ${category}/`);
        }
    });

    console.log("\n✅ File Organization Completed!");
    if (report.length > 0) {
        console.log("\n📜 Report:");
        report.forEach(entry => console.log(entry));
    } else {
        console.log("📂 No files to organize.");
    }
}

const directory = process.argv[2] || __dirname;
organizeFiles(directory);
