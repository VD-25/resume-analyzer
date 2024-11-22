import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  // State for the file and text input
  const [pdfFile, setPdfFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError('');  // Clear error if file is valid
    } else {
      setError('Please upload a valid PDF file.');
      setPdfFile(null);
    }
  };

  // Handle text input change (and enforce word limit)
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;

    if (wordCount <= 500) {
      setTextInput(inputText);
      setError('');
    } else {
      setError('Text exceeds the 500-word limit.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setError('Please upload a PDF file.');
      return;
    }

    if (!textInput.trim()) {
      setError('Text input cannot be empty.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setError('');

    // FormData to send file and text as POST request
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('textInput', textInput);

    try {
      // Send the data to your backend API (replace URL with your backend endpoint)
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('File and text uploaded successfully:',response.data);
      setPdfFile(null);  // Clear file input after successful upload
      setTextInput('');  // Clear text input after successful upload
    } catch (error) {
      console.error('Error uploading file and text:', error);
      setError('There was an error uploading your file and text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload PDF and Text</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="pdfFile">Upload PDF:</label>
          <input
            type="file"
            id="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="textInput">Text (Max 500 words):</label>
          <textarea
            id="textInput"
            value={textInput}
            onChange={handleTextChange}
            rows="6"
            placeholder="Enter text here"
          />
          <p className="word-count">
            {textInput.trim().split(/\s+/).length} / 500 words
          </p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;