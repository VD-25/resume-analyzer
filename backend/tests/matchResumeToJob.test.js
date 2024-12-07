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
const generateOutput = require('../helper/generateOutput');
const generateErrorResponse = require('../helper/generateErrorResponse');

jest.mock('../helper/getResumeAndJobDescription');
jest.mock('../helper/generateOutput', () => jest.fn());
jest.mock('../helper/generateErrorResponse', () => jest.fn());

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
    
        generateOutput.mockReturnValue({
            fit_score: 140,
            feedback: [
                "Add more details about your work with 'Google'.",
                "Expand on your role as 'Software Engineer'.",
            ],
        });
    
        const result = await matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON);
    
        expect(generateOutput).toHaveBeenCalledWith(140, [
            "Add more details about your work with 'Google'.",
            "Expand on your role as 'Software Engineer'.",
        ]);
        expect(result).toEqual({
            fit_score: 140,
            feedback: [
                "Add more details about your work with 'Google'.",
                "Expand on your role as 'Software Engineer'.",
            ],
        });
    });

    test('should return a fit score of 0 and feedback if no entities are found', async () => {
        __mockAnalyzeEntities.mockResolvedValueOnce([
            {
                entities: [], // No entities
            },
        ]);
    
        getResumeAndJobDescriptionFromJSON.mockResolvedValue({
            resume: 'Sample resume',
            jobDescription: 'Sample job description',
        });
    
        generateOutput.mockReturnValue({
            fit_score: 0,
            feedback: ["No relevant entities found in the text."],
        });
    
        const result = await matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON);
    
        expect(generateOutput).toHaveBeenCalledWith(0, ["No relevant entities found in the text."]);
        expect(result).toEqual({
            fit_score: 0,
            feedback: ["No relevant entities found in the text."],
        });
    });
    
    test('should return a standardized error response if the NLP API call fails', async () => {
        __mockAnalyzeEntities.mockRejectedValueOnce(new Error('NLP API error'));
    
        getResumeAndJobDescriptionFromJSON.mockResolvedValue({
            resume: 'Sample resume',
            jobDescription: 'Sample job description',
        });
    
        generateErrorResponse.mockReturnValue({
            error: "Failed to process data or call the NLP API.",
        });
    
        const result = await matchResumeToJob('mockPath.json', 'application1', getResumeAndJobDescriptionFromJSON)
            .catch(err => err);
    
        expect(generateErrorResponse).toHaveBeenCalledWith("Failed to process data or call the NLP API.");
        expect(result).toEqual({
            error: "Failed to process data or call the NLP API.",
        });
    });
    
});
