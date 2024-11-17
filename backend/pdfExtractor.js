const pdfParse = require('pdf-parse');

async function extractTextFromPdf(fileBuffer) {
  const data = await pdfParse(fileBuffer);
  return data.text.trim().replace(/\s+/g, ' ');
}

module.exports = { extractTextFromPdf };

