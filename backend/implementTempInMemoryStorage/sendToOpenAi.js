// resumeJobMatcher.js
const axios = require('axios');
const fs = require('fs');

// Your OpenAI API key here
const OPENAI_API_KEY = 'your-openai-api-key';

// Function to read the resume JSON file and the job description text
function getResumeAndJobDescription(resumePath, jobDescriptionPath) {
    try {
        const resume = require(resumePath); // This should be the resume in JSON format
        const jobDescription = fs.readFileSync(jobDescriptionPath, 'utf-8'); // This should be a .txt file

        return { resume, jobDescription };
    } catch (error) {
        throw new Error('Error reading the files. Please check the file paths.');
    }
}

// Function to call OpenAI API with the resume and job description
async function matchResumeToJob(resumePath, jobDescriptionPath) {
    const { resume, jobDescription } = getResumeAndJobDescription(resumePath, jobDescriptionPath);
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

// Export the function so it can be used in other files
module.exports = { matchResumeToJob };
