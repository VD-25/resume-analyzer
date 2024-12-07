const { getResumeAndJobDescriptionFromJSON } = require('../helper/getResumeAndJobDescription');
const fs = require('fs').promises;

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
    },
}));

describe('getResumeAndJobDescriptionFromJSON', () => {
    const mockData = JSON.stringify({
        application1: {
            extractTextFromPdf: 'Sample resume text',
            jobDescription: 'Sample job description',
        },
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return resume and job description when valid JSON and key are provided', async () => {
        fs.readFile.mockResolvedValue(mockData);
        const result = await getResumeAndJobDescriptionFromJSON('mockPath.json', 'application1');

        expect(result).toEqual({
            resume: 'Sample resume text',
            jobDescription: 'Sample job description',
        });
        expect(fs.readFile).toHaveBeenCalledWith('mockPath.json', 'utf-8');
    });

    test('should throw an error if the key is not found in JSON', async () => {
        fs.readFile.mockResolvedValue(mockData);

        await expect(getResumeAndJobDescriptionFromJSON('mockPath.json', 'invalidKey'))
            .rejects.toThrow("Key 'invalidKey' not found in the JSON file.");
    });

    test('should throw an error if resume or job description is missing', async () => {
        const invalidData = JSON.stringify({
            application1: { jobDescription: 'Sample job description' },
        });
        fs.readFile.mockResolvedValue(invalidData);

        await expect(getResumeAndJobDescriptionFromJSON('mockPath.json', 'application1'))
            .rejects.toThrow('Both resume and job description must be present under the provided key.');
    });

    test('should throw an error if resume or job description exceeds character limit', async () => {
        const largeData = JSON.stringify({
            application1: {
                extractTextFromPdf: 'A'.repeat(10001),
                jobDescription: 'Sample job description',
            },
        });
        fs.readFile.mockResolvedValue(largeData);

        await expect(getResumeAndJobDescriptionFromJSON('mockPath.json', 'application1'))
            .rejects.toThrow('Resume and job description must not exceed 10,000 characters each.');
    });
});
