const { readStorageFile } = require("./fileOperations");

function retrieveData(sessionId) {
    try {
        const tempStorage = readStorageFile();

        if (tempStorage[sessionId]) {
            return { sessionId, data: tempStorage[sessionId] };
        } else return { error: "Session data not found" };
    } catch (error) {
        return { error: "Error retrieving data", details: error.message };
    }
}

module.exports = retrieveData;