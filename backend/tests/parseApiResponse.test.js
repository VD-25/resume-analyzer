const { parseApiResponse } = require('../helper/parseApiResponse');

describe('parseApiResponse', () => {
    test('should parse a valid response correctly', () => {
        const rawResponse = {
            results: [
                {
                    fit_score: 0.85,
                    keywords: ["project management", "team leadership"],
                    feedback: [
                        "Add skills related to project management.",
                        "Improve your summary section to include specific achievements.",
                    ],
                },
            ],
        };

        const expected = {
            fit_score: 85,
            feedback: [
                "Add skills related to project management.",
                "Improve your summary section to include specific achievements.",
            ],
        };

        expect(parseApiResponse(rawResponse)).toEqual(expected);
    });

    test('should handle missing results array', () => {
        const rawResponse = {};

        const expected = {
            error: 'Failed to generate analysis results.',
        };

        expect(parseApiResponse(rawResponse)).toEqual(expected);
    });

    test('should handle malformed result fields', () => {
        const rawResponse = {
            results: [
                {
                    fit_score: "invalid", // Invalid fit_score type
                    feedback: "not an array", // Invalid feedback type
                },
            ],
        };

        const expected = {
            error: 'Failed to generate analysis results.',
        };

        expect(parseApiResponse(rawResponse)).toEqual(expected);
    });

    test('should handle empty results array', () => {
        const rawResponse = {
            results: [],
        };

        const expected = {
            error: 'Failed to generate analysis results.',
        };

        expect(parseApiResponse(rawResponse)).toEqual(expected);
    });
});
