const { calculateFitScore } = require('../helper/calculateFitScore');

describe('calculateFitScore', () => {
    test('should calculate fit score correctly for matching keywords', () => {
        const input = {
            resume_text: "Experienced software engineer with Python and Java skills.",
            job_description: "Looking for a software engineer with experience in Python, AWS, and REST APIs.",
        };

        const result = calculateFitScore(input);

        expect(result).toEqual({
            fit_score: 38, 
            matched: ['software', 'engineer', 'python'],
            total_keywords_in_job: 8,
        });
    });

    test('should return 100 when all keywords match', () => {
        const input = {
            resume_text: "Python Java AWS REST APIs",
            job_description: "Python Java AWS REST APIs",
        };

        const result = calculateFitScore(input);

        expect(result).toEqual({
            fit_score: 100,
            matched: ['python', 'java', 'aws', 'rest', 'apis'],
            total_keywords_in_job: 5,
        });
    });

    test('should handle empty inputs gracefully', () => {
        const result1 = calculateFitScore({ resume_text: '', job_description: 'Python Java AWS REST APIs' });
        const result2 = calculateFitScore({ resume_text: 'Python Java AWS REST APIs', job_description: '' });

        expect(result1).toEqual({ error: 'Invalid or missing resume text.' });
        expect(result2).toEqual({ error: 'Invalid or missing job description.' });
    });

    test('should return 0 fit score when no keywords match', () => {
        const input = {
            resume_text: "Graphic designer with expertise in Adobe Illustrator.",
            job_description: "Looking for a software engineer with experience in Python, AWS, and REST APIs.",
        };

        const result = calculateFitScore(input);

        expect(result).toEqual({
            fit_score: 0,
            matched: [],
            total_keywords_in_job: 8,
        });
    });
});
