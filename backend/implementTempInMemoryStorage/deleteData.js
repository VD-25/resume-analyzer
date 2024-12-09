const { readStorageFile, writeStorageFile } = require("./fileOperations");

function deleteData(sessionId) {
    try {
        const tempStorage = readStorageFile();

        if (tempStorage[sessionId]) {
            const dataToProcess = tempStorage[sessionId];
            delete tempStorage[sessionId];
            writeStorageFile(tempStorage);

            return { message: 'Data processed and removed from file', sessionId };
        }
        return { error: 'Session data not found' };
    } catch (error) {
        return { error: 'Error processing data', details: error.message };
    }
}

module.exports = deleteData;