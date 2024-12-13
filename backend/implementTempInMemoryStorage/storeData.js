const { readStorageFile, writeStorageFile } = require("./fileOperations");
const MAX_SIZE = 1000;

async function storeData(req, res) {
    const { sessionId, extractTextFromPdf, jobDescription } = req.body;

    if (!sessionId || !extractTextFromPdf || !jobDescription) {
        return res.status(400).json({
            error: "sessionId, extractTextFromPdf, and jobDescription are required",
        });
    }

    try {
        const tempStorage = readStorageFile();

        tempStorage[sessionId] = { extractTextFromPdf, jobDescription };

        const sessionIds = Object.keys(tempStorage);
        if (sessionIds.length > MAX_SIZE) {
            delete tempStorage[sessionIds[0]];
        }

        writeStorageFile(tempStorage);

        return res.status(201).json({
            message: "Data stored temporarily in file",
            sessionId,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error storing data",
            details: error.message,
        });
    }
}

module.exports = storeData;
