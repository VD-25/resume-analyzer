const app = require('./userSignUp');
const { extractTextFromPdf } = require('./pdfExtractor');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
