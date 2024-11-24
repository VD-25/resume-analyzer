const storeData = require("../backend/implementTempInMemoryStorage/storeData");
const { readStorageFile, writeStorageFile } = require("../backend/implementTempInMemoryStorage/fileOperations");

jest.mock("../backend/implementTempInMemoryStorage/fileOperations"); // Mock the file operations

describe("storeData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should store/save data in the storage", async () => {
        const mockStorage = {};
        readStorageFile.mockReturnValue(mockStorage); // Mock initial empty storage
        writeStorageFile.mockImplementation(() => {}); // Mock write behavior

        const sessionId = "token_idX";
        const extractTextFromPdf = "Sample text content from PDF";
        const jobDescription = "Sample job description";

        const result = await storeData(sessionId, extractTextFromPdf, jobDescription);

        expect(result).toEqual({
            message: "Data stored temporarily in file",
            sessionId,
        });

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).toHaveBeenCalledWith({
            token_idX: { extractTextFromPdf, jobDescription },
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

        const sessionId = "token_id1001";
        const extractTextFromPdf = "New sample text";
        const jobDescription = "New job description";

        const result = await storeData(sessionId, extractTextFromPdf, jobDescription);

        // Ensure the last-added data is removed
        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).toHaveBeenCalledWith(
            expect.not.objectContaining({ token_id1: expect.anything() })
        );
        expect(writeStorageFile).toHaveBeenCalledWith(
            expect.objectContaining({
                [sessionId]: { extractTextFromPdf, jobDescription },
            })
        );

        expect(result).toEqual({
            message: "Data stored temporarily in file",
            sessionId,
        });
    });

    it("should handle errors", async () => {
        const errorMessage = "Failed to read file";
        readStorageFile.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const sessionId = "token_idX";
        const extractTextFromPdf = "Sample text";
        const jobDescription = "Sample description";

        const result = await storeData(sessionId, extractTextFromPdf, jobDescription);

        expect(result).toEqual({
            error: "Error storing data",
            details: errorMessage,
        });

        expect(readStorageFile).toHaveBeenCalledTimes(1);
        expect(writeStorageFile).not.toHaveBeenCalled();
    });
});