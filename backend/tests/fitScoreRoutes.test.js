const request = require('supertest');
const express = require('express');
const fitScoreRoutes = require('../fitScoreRoutes');
const { calculateFitScore } = require('../helper/calculateFitScore');
const { generateFeedback } = require('../helper/generateFeedback');

jest.mock('../helper/calculateFitScore');
jest.mock('../helper/generateFeedback');

const app = express();
app.use(express.json());
app.use('/api', fitScoreRoutes);

describe('POST /api/fit-score', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return fit score and feedback when valid data is provided', async () => {
        calculateFitScore.mockReturnValue({
            fit_score: 85,
            matched_keywords: ['python', 'aws', 'rest apis'],
            total_keywords_in_job: 10,
        });
        generateFeedback.mockResolvedValue({
            missing_keywords: ['aws', 'rest apis'],
            suggestions: [
                'Highlight your proficiency with "AWS".',
                'Highlight your proficiency with "REST APIs".',
            ],
        });

        const response = await request(app)
            .post('/api/fit-score')
            .send({
                resume_text: 'Experienced software engineer with Python and Java skills.',
                job_description: 'Looking for a software engineer with experience in Python, AWS, and REST APIs.',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            fit_score: 85,
            feedback: [
                'Highlight your proficiency with "AWS".',
                'Highlight your proficiency with "REST APIs".',
            ],
        });
    });

    test('should return 400 if inputs are missing', async () => {
        const response = await request(app)
            .post('/api/fit-score')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Both resume_text and job_description are required.',
        });
    });

    test('should return 400 if inputs exceed character limit', async () => {
        const longText = 'a'.repeat(10001);
        const response = await request(app)
            .post('/api/fit-score')
            .send({ resume_text: longText, job_description: longText });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Input exceeds maximum character limit of 10,000.',
        });
    });

    test('should return 500 if processing fails', async () => {
        calculateFitScore.mockImplementation(() => {
            throw new Error('Calculation error');
        });

        const response = await request(app)
            .post('/api/fit-score')
            .send({
                resume_text: 'Sample resume text',
                job_description: 'Sample job description',
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'An error occurred while processing the fit score and feedback.',
        });
    });
});
