
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();
require('dotenv').config({ path: '.env' });


// Your OpenAI API key here
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set your API key here

// Middleware to parse JSON request bodies


// Function to get the resume and job description from the same key in a JSON file
function getResumeAndJobDescriptionFromJSON(jsonPath, key) {
    try {
        // Read the entire JSON file
        const data = require(jsonPath);
        const applicationData = data[key];

        if (!applicationData) {
            throw new Error(`Key '${key}' not found in the JSON file.`);
        }

        const resume = applicationData.extractTextFromPdf; // Extract the resume object
        const jobDescription = applicationData.jobDescription; // Extract the job description string
        console.log(resume,jobDescription);
        if (!resume || !jobDescription) {
            throw new Error('Both resume and job description must be present under the provided key.');
        }

        return { resume, jobDescription };
    } catch (error) {
        throw new Error('Error reading the files or key. Please check the file path or key name.');
    }
}

// Function to match resume to job description using OpenAI API
async function matchResumeToJob(jsonPath, key) {
    const { resume, jobDescription } = getResumeAndJobDescriptionFromJSON(jsonPath, key);

    const prompt = `
    You are a helpful assistant. Below is a resume and a job description.

    Resume:
    ${JSON.stringify(resume, null, 2)}

    Job Description:
    ${jobDescription}

    Please analyze the resume and job description, and summarize how well this resume matches the job description. Highlight the relevant skills, experience, and qualifications, and suggest improvements if necessary.
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4', // or 'gpt-3.5-turbo'
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.5,
            top_p: 1,
            n: 1,
            stop: null,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const output = response.data.choices[0].text.trim();
        return output;
    } catch (error) {
        throw new Error('Error calling OpenAI API: ' + (error.response ? error.response.data : error.message));
    }
}

// Define a route to get the job application analysis
router.get('/analyze-application', async (req, res) => {
    try {
        const { jsonPath, key } = req.body;

        // Validate input
        if (!jsonPath || !key) {
            return res.status(400).json({ error: 'jsonPath and key are required' });
        }

        const result = await matchResumeToJob(jsonPath, key);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the express app
module.exports = router;
