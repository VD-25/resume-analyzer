const deleteData = require("../implementTempInMemoryStorage/deleteData");
const { readStorageFile, writeStorageFile } = require("../implementTempInMemoryStorage/fileOperations");

jest.mock("../implementTempInMemoryStorage/fileOperations");

describe("deleteData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the data for a valid session ID", () => {
    const sessionId = "token_idX";
    const mockData = {
      [sessionId]: { resumeText: "Sample resume text", jobDescription: "Sample job description" },
    };
    readStorageFile.mockReturnValue(mockData);

    const updatedData = {}; // Expect storage to be empty after deletion
    writeStorageFile.mockImplementationOnce((data) => {
        expect(data).toEqual(updatedData);
    });

    const req = { query: { sessionId } }; // Mock request with sessionId in query
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    deleteData(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Data deleted successfully", sessionId });
    expect(readStorageFile).toHaveBeenCalledTimes(1);
  });

  it("should return an error if the session ID is not found", () => {
    const mockData = {
      token_idX: { resumeText: "Other text", jobDescription: "Other job description" },
    };
    readStorageFile.mockReturnValue(mockData);

    // Mock Express.js request and response
    const req = { query: { sessionId: "nonexistentSession" } }; // Non-existent sessionId
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };
    deleteData(req, res);

    expect(readStorageFile).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Session data not found" });
  });

  it("should return an error if there is an issue reading or writing the file", () => {
    // Mock readStorageFile to throw an error
    readStorageFile.mockImplementation(() => {
      throw new Error("File read error");
    });

    // Mock Express.js request and response
    const req = { query: { sessionId: "token_idX" } };
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };
    deleteData(req, res);

    expect(readStorageFile).toHaveBeenCalledTimes(1);
    expect(writeStorageFile).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error deleting data",
      details: "File read error",
    });
  });
});
