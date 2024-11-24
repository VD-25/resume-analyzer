const { readStorageFile, writeStorageFile } = require("./fileOperations");
const MAX_SIZE = 1000;

async function storeData(sessionId, extractTextFromPdf, jobDescription) {
    try {
        const tempStorage = readStorageFile();

        tempStorage[sessionId] = { extractTextFromPdf, jobDescription };

        const sessionIds = Object.keys(tempStorage);
        if (sessionIds.length > MAX_SIZE) {
            delete tempStorage[sessionIds[0]]; // Remove the first-added data
        }

        writeStorageFile(tempStorage);

        return { message: "Data stored temporarily in file", sessionId };
    } catch (error) {
        return { error: "Error storing data", details: error.message };
    }
}

module.exports = storeData;