const { extractTextFromPdf, normalizeText } = require('../backend/pdfExtractor');
const fs = require('fs');
const path = require('path');

describe('extractTextFromPdf', () => {
  it('should extract and clean text from a sample PDF file', async () => {
    // Load a sample PDF file from the test resources
    const samplePdfPath = path.join(__dirname,'pdfFiles', 'sample.pdf');
    const fileBuffer = fs.readFileSync(samplePdfPath);

    // Run the utility function
    const extractedText = await extractTextFromPdf(fileBuffer);

    // Assert that text is extracted (adjust expected result based on actual PDF content)
    expect(typeof extractedText).toBe('string');
    expect(extractedText.length).toBeGreaterThan(0);
    expect(extractedText).not.toMatch(/\s{2,}/); // Check that there is no excessive whitespace
  });

  it('should return an empty string for an empty PDF file', async () => {
    const emptyPdfPath = path.join(__dirname,'pdfFiles', 'empty.pdf');
    const fileBuffer = fs.readFileSync(emptyPdfPath);

    const extractedText = await extractTextFromPdf(fileBuffer);

    expect(extractedText).toBe('');
  });

  it('should handle PDFs with images and return appropriate text content', async () => {
    const pdfWithImagesPath = path.join(__dirname, 'pdfFiles', 'pdfWithImages.pdf');
    const fileBuffer = fs.readFileSync(pdfWithImagesPath);
  
    const extractedText = await extractTextFromPdf(fileBuffer);
  
    expect(typeof extractedText).toBe('string');
    expect(extractedText.length).toBeGreaterThan(0); // Text content may be minimal, depending on the file
  });
});
