const generateOutput = require('../helper/generateOutput');

describe('generateOutput', () => {
    test('should return valid output structure', () => {
        const output = generateOutput(85, ["Good match", "Add details about leadership"]);
        expect(output).toEqual({
            fit_score: 85,
            feedback: ["Good match", "Add details about leadership"],
        });
    });

    test('should clamp fit_score between 0 and 100', () => {
        const output = generateOutput(150, ["Feedback"]);
        expect(output.fit_score).toBe(100);

        const outputLow = generateOutput(-20, ["Feedback"]);
        expect(outputLow.fit_score).toBe(0);
    });

    test('should throw error for invalid input types', () => {
        expect(() => generateOutput("85", ["Feedback"])).toThrow("Invalid data format for output");
    });
});
