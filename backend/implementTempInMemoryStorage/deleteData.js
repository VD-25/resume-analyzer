function deleteData(req, res) {
    const { sessionId } = req.query;

    if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
    }

    try {
        const tempStorage = readStorageFile();
        if (tempStorage[sessionId]) {
            delete tempStorage[sessionId];
            return res.status(200).json({
                message: "Data deleted successfully",
                sessionId,
            });
        } else {
            return res.status(404).json({ error: "Session data not found" });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Error deleting data",
            details: error.message,
        });
    }
}

module.exports = deleteData;
