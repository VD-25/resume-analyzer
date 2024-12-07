function generateOutput(fitScore, feedback) {
    if (typeof fitScore !== 'number' || !Array.isArray(feedback)) {
        throw new Error("Invalid data format for output");
    }

    return {
        fit_score: Math.min(Math.max(fitScore, 0), 100),
        feedback: feedback.map(String),
    };
}

module.exports = generateOutput;
