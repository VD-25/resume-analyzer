const tempStorage = {};

async function storeData(sessionId, extractTextFromPdf, jobDescription) {
    try {

        tempStorage[sessionId] = { extractTextFromPdf, jobDescription };

        return { message: 'Data stored temporarily in memory', sessionId };
    } catch (error) {
        return { error: 'Error extracting text from the PDF', details: error.message };
    }
}

function retrieveData(sessionId) {
    if (tempStorage[sessionId]) {
        return { sessionId, data: tempStorage[sessionId] };
    }
    return { error: 'Session data not found' };
}

function processData(sessionId) {
    if (tempStorage[sessionId]) {
        const dataToProcess = tempStorage[sessionId];

        console.log('Processing data:', dataToProcess);

        delete tempStorage[sessionId];
        return { message: 'Data processed and removed from memory', sessionId };
    }
    return { error: 'Session data not found' };
}

module.exports = {
    storeData,
    retrieveData,
    processData
};
