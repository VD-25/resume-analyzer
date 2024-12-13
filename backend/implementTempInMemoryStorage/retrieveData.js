const { readStorageFile } = require("./fileOperations");

function retrieveData(req, res) {
    const { sessionId } = req.query;

    if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
    }

    try {
        const tempStorage = readStorageFile();

        if (tempStorage[sessionId]) {
            return res.status(200).json({
                sessionId,
                data: tempStorage[sessionId],
            });
        } else {
            return res.status(404).json({ error: "Session data not found" });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Error retrieving data",
            details: error.message,
        });
    }
}

module.exports = retrieveData;
