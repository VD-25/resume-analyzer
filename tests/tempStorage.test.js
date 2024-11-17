const { storeData, retrieveData, processData } = require('../backend/tempStorage');

describe('TempStorage Module Tests', () => {
    const sessionId = 'test_session';
    const jobDescription = 'Test job description';
    const dummyExtractedText = 'Dummy extracted text';

    beforeEach(async () => {
        // Store data for each test to have a fresh state
        await storeData(sessionId, dummyExtractedText, jobDescription);
    });

    afterEach(() => {
        // Process data to clear storage after each test
        processData(sessionId);
    });

    it('should store data correctly in memory', async () => {
        const response = await storeData(sessionId, dummyExtractedText, jobDescription);

        expect(response).toEqual({
            message: 'Data stored temporarily in memory',
            sessionId
        });

        const storedData = retrieveData(sessionId);
        expect(storedData).toEqual({
            sessionId,
            data: {
                extractTextFromPdf: dummyExtractedText,
                jobDescription
            }
        });
    });

    it('should retrieve stored data correctly', () => {
        const retrievedData = retrieveData(sessionId);
        expect(retrievedData).toEqual({
            sessionId,
            data: {
                extractTextFromPdf: dummyExtractedText,
                jobDescription
            }
        });
    });

    it('should return an error when retrieving data with an invalid session ID', () => {
        const retrievedData = retrieveData('invalid_session');
        expect(retrievedData).toEqual({ error: 'Session data not found' });
    });

    it('should process and remove data correctly', () => {
        const response = processData(sessionId);
        expect(response).toEqual({
            message: 'Data processed and removed from memory',
            sessionId
        });

        // Verify that the data has been removed
        const retrievedData = retrieveData(sessionId);
        expect(retrievedData).toEqual({ error: 'Session data not found' });
    });

    it('should return an error when processing data with an invalid session ID', () => {
        const response = processData('invalid_session');
        expect(response).toEqual({ error: 'Session data not found' });
    });
});
