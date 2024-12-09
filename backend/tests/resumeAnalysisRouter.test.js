const request = require('supertest');
const express = require('express');
const router = require('../routes/resumeAnalysisRoutes');
const { matchResumeToJob } = require('../helper/matchResumeToJob');

jest.mock('../helper/matchResumeToJob');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('POST /api/analyze-application', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 and the result from matchResumeToJob', async () => {
        matchResumeToJob.mockResolvedValue({
            results: [
                {
                    fit_score: 0.85,
                    keywords: ['project management', 'team leadership'],
                    feedback: ['Add more relevant skills.', 'Improve the summary section.'],
                },
            ],
        });

        const response = await request(app)
            .post('/api/analyze-application')
            .send({ jsonPath: 'mockPath.json', key: 'application1' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            fit_score: 85,
            feedback: ['Add more relevant skills.', 'Improve the summary section.'],
        });
    });

    test('should return 400 if jsonPath or key is missing', async () => {
        const response = await request(app)
            .post('/api/analyze-application')
            .send({ jsonPath: 'mockPath.json' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'jsonPath and key are required' });
    });

    test('should return 500 if matchResumeToJob throws an error', async () => {
        matchResumeToJob.mockRejectedValue(new Error('Error in matchResumeToJob'));

        const response = await request(app)
            .post('/api/analyze-application')
            .send({ jsonPath: 'mockPath.json', key: 'application1' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error in matchResumeToJob' });
    });
});
