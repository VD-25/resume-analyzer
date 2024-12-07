
require('dotenv').config();
const express = require('express');
const { getResumeAndJobDescriptionFromJSON } = require('./helper/getResumeAndJobDescription');
const { matchResumeToJob } = require('./helper/matchResumeToJob');
const { parseApiResponse } = require('./parseApiResponse');
const compareResumeRouter = require('./compareResumeRouter');

const router = express.Router();

router.post('/analyze-application', async (req, res) => {
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
});

router.use(compareResumeRouter);

module.exports = router;
