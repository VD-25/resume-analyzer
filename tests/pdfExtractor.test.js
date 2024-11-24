const { extractTextFromPdf } = require("../backend/pdfExtractor");
const fs = require('fs');
const path = require('path');

const loadPdf = (fileName) => {
  const filePath = path.join(__dirname, "pdfFiles", fileName);
  return fs.readFileSync(filePath);
};

describe("extractTextFromPdf", () => {
  it("should extract and clean text from a PDF file", async () => {
    const fileBuffer = loadPdf("sample1_text.pdf");
    const extractedText = await extractTextFromPdf(fileBuffer);

    expect(typeof extractedText).toBe("string");
    expect(extractedText.length).toBeGreaterThan(0);
    expect(extractedText).not.toMatch(/\s{2,}/); // Ensure no excessive whitespace
  });

  it("should handle PDFs with breaklines and return text content", async () => {
    const fileBuffer = loadPdf("sample2_textWithBreaklines.pdf");
    const extractedText = await extractTextFromPdf(fileBuffer);

    expect(typeof extractedText).toBe("string");
    expect(extractedText.length).toBeGreaterThan(0);
    expect(extractedText).not.toMatch(/\s{2,}/);
    expect(extractedText).not.toMatch(/\n/); // Ensure no newlines are left
    expect(extractedText).toMatch(/\S+/); // Ensure the text contains content
  });

  it("should return an empty string for an empty PDF file", async () => {
    const fileBuffer = loadPdf("sample3_empty.pdf");
    const extractedText = await extractTextFromPdf(fileBuffer);

    expect(extractedText).toBe("");
  });

  it("should handle PDFs with images and return text content", async () => {
    const fileBuffer = loadPdf('sample4_textWithImages.pdf');  
    const extractedText = await extractTextFromPdf(fileBuffer);
  
    expect(typeof extractedText).toBe('string');
    expect(extractedText.length).toBeGreaterThan(0);
  });
});
