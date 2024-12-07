function parseApiResponse(rawResponse) {
    try {
        if (
            !rawResponse ||
            !Array.isArray(rawResponse.results) ||
            rawResponse.results.length === 0
        ) {
            throw new Error('Malformed response: Missing results array.');
        }

        const result = rawResponse.results[0];

        if (
            typeof result.fit_score !== 'number' ||
            !Array.isArray(result.feedback)
        ) {
            throw new Error('Malformed response: Missing or invalid fields.');
        }

        const fit_score = Math.round(result.fit_score * 100);
        const feedback = result.feedback;

        return {
            fit_score,
            feedback,
        };
    } catch (error) {
        return {
            error: 'Failed to generate analysis results.',
        };
    }
}

module.exports = { parseApiResponse };
