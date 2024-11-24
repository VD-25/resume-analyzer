const retrieveData = require("../backend/implementTempInMemoryStorage/retrieveData");

const { readStorageFile } = require("../backend/implementTempInMemoryStorage/fileOperations");

jest.mock("../backend/implementTempInMemoryStorage/fileOperations"); // Mock the file operations

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

        const result = retrieveData("session1");

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            sessionId: "session1",
            data: { extractTextFromPdf: "Sample text", jobDescription: "Sample description" },
        });
    });

    it("should return an error if session ID does not exist", () => {
        const mockStorage = {
            session2: { extractTextFromPdf: "Another text", jobDescription: "Another description" },
        };
        readStorageFile.mockReturnValue(mockStorage); // Mock storage without the target session

        const result = retrieveData("session1");

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ error: "Session data not found" });
    });

    it("should handle errors when readStorageFile throws an error", () => {
        const errorMessage = "Failed to read file";
        readStorageFile.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = retrieveData("session1");

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            error: "Error retrieving data",
            details: errorMessage,
        });
    });
});