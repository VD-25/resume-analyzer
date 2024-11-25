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

    const updatedData = {};
    writeStorageFile.mockImplementationOnce(data => {
      expect(data).toEqual(updatedData);
    });

    const result = deleteData(sessionId);

    expect(result).toEqual({ message: "Data processed and removed from file", sessionId });
    expect(readStorageFile).toHaveBeenCalledTimes(1);
    expect(writeStorageFile).toHaveBeenCalledWith(updatedData);
  });

  it("should return an error if the session ID is not found", () => {
    const sessionId = "nonexistentSession";
    const mockData = {
      token_idX: { resumeText: "Other text", jobDescription: "Other job description" },
    };

    readStorageFile.mockReturnValue(mockData);

    const result = deleteData(sessionId);

    expect(result).toEqual({ error: "Session data not found" });
    expect(readStorageFile).toHaveBeenCalledTimes(1);
    expect(writeStorageFile).not.toHaveBeenCalled();
  });

  it("should return an error if there is an issue reading or writing the file", () => {
    const sessionId = "token_idX";

    // Mock readStorageFile to throw an error
    readStorageFile.mockImplementation(() => {
      throw new Error("File read error");
    });

    const result = deleteData(sessionId);

    expect(result).toEqual({
      error: "Error processing data",
      details: "File read error",
    });
    expect(readStorageFile).toHaveBeenCalledTimes(1);
    expect(writeStorageFile).not.toHaveBeenCalled();
  });
});
