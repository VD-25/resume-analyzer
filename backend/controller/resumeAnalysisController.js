const { getResumeAndJobDescriptionFromJSON } = require('../helper/getResumeAndJobDescription');
const { matchResumeToJob } = require('../helper/matchResumeToJob');
const { parseApiResponse } = require('../helper/parseApiResponse');

const analyzeApplicationHandler = async (req, res) => {
    try {
        const { jsonPath, key } = req.body;

        if (!jsonPath || !key) {
            return res.status(400).json({ error: 'jsonPath and key are required' });
        }

        const result = await matchResumeToJob(jsonPath, key, getResumeAndJobDescriptionFromJSON);
        const parsedResponse = parseApiResponse(result);
        res.json(parsedResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { analyzeApplicationHandler };
