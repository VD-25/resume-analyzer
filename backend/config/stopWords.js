const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'when',
    'at', 'on', 'in', 'with', 'by', 'for', 'of', 'to', 'from', 'as',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'that', 'this',
    'it', 'not', 'no', 'yes', 'so', 'too', 'very', 'can', 'cannot', 'could', 
    'should', 'would', 'may', 'might', 'must', 'shall', 'will', 'do', 'does', 
    'did', 'has', 'have', 'had', 'having', "customer", "transaction", "date",
    "team", "teams", "work", "knowledge", "coding", "issue", "issues", "over",
    "time",

    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec",
    "i", "you", "they", "we", "he", "she", "it", "my", "your", "their", "our", "his", 
    "her", "its",
    "education", "school", "new", "institute", 
]);

module.exports = { STOP_WORDS };
