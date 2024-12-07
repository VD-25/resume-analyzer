const generateErrorResponse = require('../helper/generateErrorResponse');

describe('generateErrorResponse', () => {
    test('should return default error message', () => {
        const errorResponse = generateErrorResponse();
        expect(errorResponse).toEqual({ error: "Invalid input format or data." });
    });

    test('should return custom error message', () => {
        const errorResponse = generateErrorResponse("Custom error message");
        expect(errorResponse).toEqual({ error: "Custom error message" });
    });
});
