
require('dotenv').config();
const express = require('express');
const { getResumeAndJobDescriptionFromJSON } = require('./helper/getResumeAndJobDescription');
const { matchResumeToJob } = require('./helper/matchResumeToJob');

const router = express.Router();

router.post('/analyze-application', async (req, res) => {
    try {
        const { jsonPath, key } = req.body;

        if (!jsonPath || !key) {
            return res.status(400).json({ error: 'jsonPath and key are required' });
        }

        const result = await matchResumeToJob(jsonPath, key, getResumeAndJobDescriptionFromJSON);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
