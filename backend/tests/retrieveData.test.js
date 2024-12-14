const retrieveData = require("../implementTempInMemoryStorage/retrieveData");
const { readStorageFile } = require("../implementTempInMemoryStorage/fileOperations");

jest.mock("../implementTempInMemoryStorage/fileOperations"); // Mock the file operations

describe("retrieveData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should retrieve data for an existing session ID", () => {
        const mockStorage = {
            session1: { extractTextFromPdf: "Sample text", jobDescription: "Sample description" },
            session2: { extractTextFromPdf: "Another text", jobDescription: "Another description" },
        };
        readStorageFile.mockReturnValue(mockStorage); // Mock initial storage

        // Mock Express.js request and response
        const req = { query: { sessionId: "session1" } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        retrieveData(req, res);

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            sessionId: "session1",
            data: { extractTextFromPdf: "Sample text", jobDescription: "Sample description" },
        });
    });

    it("should return an error if session ID does not exist", () => {
        const mockStorage = {
            session2: { extractTextFromPdf: "Another text", jobDescription: "Another description" },
        };
        readStorageFile.mockReturnValue(mockStorage); // Mock storage without the target session

        // Mock Express.js request and response
        const req = { query: {} };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        retrieveData(req, res);

        expect(readStorageFile).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "sessionId is required" });
    });

    it("should handle errors when readStorageFile throws an error", () => {
        const errorMessage = "Failed to read file";
        readStorageFile.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        // Mock Express.js request and response
        const req = { query: { sessionId: "session1" } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        retrieveData(req, res);

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Error retrieving data",
            details: errorMessage,
        });
    });
});