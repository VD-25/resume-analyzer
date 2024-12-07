jest.mock('@google-cloud/language', () => {
    const mockAnalyzeEntities = jest.fn();
    return {
        LanguageServiceClient: jest.fn(() => ({
            analyzeEntities: mockAnalyzeEntities,
        })),
        __mockAnalyzeEntities: mockAnalyzeEntities, // Expose mock for customization
    };
});

const { LanguageServiceClient, __mockAnalyzeEntities } = require('@google-cloud/language');
const { matchResumeToJob } = require('../helper/matchResumeToJob');
const { getResumeAndJobDescriptionFromJSON } = require('../helper/getResumeAndJobDescription');

jest.mock('../helper/getResumeAndJobDescription');

describe('matchResumeToJob', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return fit score and feedback when valid data is provided', async () => {
        __mockAnalyzeEntities.mockResolvedValueOnce([
            {
                entities: [
                    { name: 'Google', type: 'ORGANIZATION', salience: 0.8 },
                    { name: 'Software Engineer', type: 'PERSON', salience: 0.6 },
                ],
            },
        ]);

        getResumeAndJobDescriptionFromJSON.mockResolvedValue({
            resume: 'Sample resume',
            jobDescription: 'Sample job description',
        });

        const result = await matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON);

        expect(result).toEqual({
            fit_score: 140,
            feedback: [
                "Add more details about your work with 'Google'.",
                "Expand on your role as 'Software Engineer'.",
            ],
        });
    });
    
    test('should return a fit score of 0 and feedback if no entities are found', async () => {
        // Set up mock response for analyzeEntities
        __mockAnalyzeEntities.mockResolvedValueOnce([
            {
                entities: [], // No entities
            },
        ]);

        getResumeAndJobDescriptionFromJSON.mockResolvedValue({
            resume: 'Sample resume',
            jobDescription: 'Sample job description',
        });

        const result = await matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON);

        expect(result).toEqual({
            fit_score: 0,
            feedback: ["No relevant entities found in the text."],
        });
    });

    test('should throw an error if the NLP API call fails', async () => {
        __mockAnalyzeEntities.mockRejectedValueOnce(new Error('NLP API error'));

        getResumeAndJobDescriptionFromJSON.mockResolvedValue({
            resume: 'Sample resume',
            jobDescription: 'Sample job description',
        });

        await expect(
            matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON)
        ).rejects.toThrow('Error calling Google Natural Language API: NLP API error');
    });
});
