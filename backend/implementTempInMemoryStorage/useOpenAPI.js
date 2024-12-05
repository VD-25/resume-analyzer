// app.js
const { matchResumeToJob } = require('./resumeJobMatcher');

// Define paths to your resume JSON and job description text files
const resumePath = './resume.json'; // Path to the resume JSON file
const jobDescriptionPath = './job_description.txt'; // Path to the job description text file

// Call the function to match the resume with the job description
async function run() {
    try {
        const result = await matchResumeToJob(resumePath, jobDescriptionPath);
        console.log('Analysis of Resume vs Job Description:\n', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

run();
