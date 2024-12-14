const { STOP_WORDS } = require('../config/stopWords');
const isPhoneNumber = require('../config/isPhoneNumber');

const tokenizeAndNormalize = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') 
        .split(/\s+/) 
        .filter(token => token && !STOP_WORDS.has(token) && !isPhoneNumber(token));

module.exports = { tokenizeAndNormalize };
