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
const { generateFeedback } = require('../helper/generateFeedback');

describe('generateFeedback', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should generate feedback dynamically for missing keywords', async () => {
        __mockAnalyzeEntities.mockResolvedValueOnce([
            {
                entities: [
                    { name: 'AWS', type: 'SKILL' },
                    { name: 'REST APIs', type: 'SKILL' },
                    { name: 'experience', type: 'OTHER' },
                ],
            },
        ]);

        const resume_text = "Experienced software engineer with Python and Java skills.";
        const job_description = "Looking for a software engineer with experience in Python, AWS, and REST APIs.";

        const result = await generateFeedback(resume_text, job_description);

        expect(result).toEqual({
            missing_keywords: ['aws', 'rest apis', 'experience'],
            suggestions: [
                'Highlight your proficiency with "AWS".',
                'Highlight your proficiency with "REST APIs".',
                'Consider including content related to "experience".',
            ],
        });
    });

    test('should handle cases where no keywords are missing', async () => {
        __mockAnalyzeEntities.mockResolvedValueOnce([
            {
                entities: [],
            },
        ]);

        const resume_text = "Python Java AWS REST APIs";
        const job_description = "Python Java AWS REST APIs";

        const result = await generateFeedback(resume_text, job_description);

        expect(result).toEqual({
            missing_keywords: [],
            suggestions: [],
        });
    });

    test('should return a standardized error response if the NLP API call fails', async () => {
        __mockAnalyzeEntities.mockRejectedValueOnce(new Error('NLP API error'));

        const resume_text = "Experienced software engineer with Python and Java skills.";
        const job_description = "Looking for a software engineer with experience in Python, AWS, and REST APIs.";

        await expect(generateFeedback(resume_text, job_description)).rejects.toThrow(
            'Error analyzing entities with Google NLP: NLP API error'
        );
    });
});
