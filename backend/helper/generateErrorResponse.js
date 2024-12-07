function generateErrorResponse(errorMessage) {
    return {
        error: errorMessage || "Invalid input format or data.",
    };
}

module.exports = generateErrorResponse;
