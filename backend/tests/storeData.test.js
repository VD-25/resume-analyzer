const storeData = require("../implementTempInMemoryStorage/storeData");
const { readStorageFile, writeStorageFile } = require("../implementTempInMemoryStorage/fileOperations");

jest.mock("../implementTempInMemoryStorage/fileOperations"); // Mock the file operations

describe("storeData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should store/save data in the storage", async () => {
        const mockStorage = {};
        readStorageFile.mockReturnValue(mockStorage); // Mock initial empty storage
        writeStorageFile.mockImplementation(() => {}); // Mock write behavior

        // Mock Express.js request and response
        const req = {
            body: {
                sessionId: "token_idX",
                extractTextFromPdf: "Sample text content from PDF",
                jobDescription: "Sample job description",
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        await storeData(req, res);

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).toHaveBeenCalledWith({
            token_idX: {
                extractTextFromPdf: "Sample text content from PDF",
                jobDescription: "Sample job description",
            },
        });
        expect(res.json).toHaveBeenCalledWith({
            message: "Data stored temporarily in file",
            sessionId: "token_idX",
        });
    });

    it("should ensure maximum storage size", async () => {
        const mockStorage = {};
        for (let i = 1; i <= 1000; i++) {
            mockStorage[`token_id${i}`] = {
                extractTextFromPdf: `Text ${i}`,
                jobDescription: `Description ${i}`,
            };
        }
        readStorageFile.mockReturnValue(mockStorage);
        writeStorageFile.mockImplementation(() => {});

        // Mock Express.js request and response
        const req = {
            body: {
                sessionId: "token_id1001",
                extractTextFromPdf: "New sample text",
                jobDescription: "New job description",
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        await storeData(req, res);

        // Ensure the last-added data is removed
        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).toHaveBeenCalledWith(
            expect.not.objectContaining({ token_id1: expect.anything() })
        );
        expect(writeStorageFile).toHaveBeenCalledWith(
            expect.objectContaining({
                token_id1001: {
                    extractTextFromPdf: "New sample text",
                    jobDescription: "New job description",
                },
            })
        );
        expect(res.json).toHaveBeenCalledWith({
            message: "Data stored temporarily in file",
            sessionId: "token_id1001",
        });
    });

    it("should handle errors", async () => {
        const errorMessage = "Failed to read file";
        readStorageFile.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        // Mock Express.js request and response
        const req = {
            body: {
                sessionId: "token_idX",
                extractTextFromPdf: "Sample text",
                jobDescription: "Sample description",
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        await storeData(req, res);

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Error storing data",
            details: errorMessage,
        });
    });
});