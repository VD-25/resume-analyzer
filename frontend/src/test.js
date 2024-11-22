// form.test.js
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { validateFile, validateCharCount, submitForm } = require('./Form.js');

// Mock Axios
const mock = new MockAdapter(axios);

test('validates supported file types and sizes', () => {
  const validFile = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
  const invalidFile = new File(['resume'], 'resume.txt', { type: 'text/plain' });

  expect(validateFile(validFile)).toBe(true);
  expect(validateFile(invalidFile)).toBe(false);
});

test('validates character count', () => {
  const withinLimit = 'a'.repeat(4999);
  const atLimit = 'a'.repeat(5000);
  const overLimit = 'a'.repeat(5001);

  expect(validateCharCount(withinLimit)).toBe(true);
  expect(validateCharCount(atLimit)).toBe(true);
  expect(validateCharCount(overLimit)).toBe(false);
});

test('mock API calls', async () => {
  mock.onPost('/api/resume-upload').reply(200);
  mock.onPost('/api/job-description').reply(200);

  const formData = new FormData();
  formData.append('resume', new File(['resume'], 'resume.pdf', { type: 'application/pdf' }));
  formData.append('jobDescription', 'Sample job description');

  const result = await submitForm(formData);
  expect(result).toBe('Submission successful!');
});