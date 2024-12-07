const { STOP_WORDS } = require('./stopWords');

const tokenizeAndNormalize = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') 
        .split(/\s+/) 
        .filter(token => token && !STOP_WORDS.has(token)); 

module.exports = { tokenizeAndNormalize };
