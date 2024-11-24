const fs = require("fs");
const path = require("path");

const storageFilePath = path.resolve(__dirname, "./tempInMemoryStorage.json");

function readStorageFile() {
    if (!fs.existsSync(storageFilePath)) {
        fs.writeFileSync(storageFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(storageFilePath, "utf8");
    return JSON.parse(data || "{}");
}

function writeStorageFile(data) {
    fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2));
}

module.exports = {
    readStorageFile,
    writeStorageFile
};