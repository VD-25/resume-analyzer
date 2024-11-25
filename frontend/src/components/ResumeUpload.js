import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const ResumeUpload = ({ onUploadSuccess }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [textError, setTextError] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a valid PDF file.');
        setPdfFile(null);
      } else if (file.size > 2 * 1024 * 1024) { // 2MB file size limit
        setError('File must be smaller than 2MB.');
        setPdfFile(null);
      } else {
        setPdfFile(file);
        setError('');
      }
    } else {
      setError('No file selected.');
    }
  };

  // Handle text input change
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextInput(inputText);
    setTextError('');
    if (inputText.length > 5000) {
      setTextError('Text exceeds the 5000-character limit.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!pdfFile) {
      setError('Please upload a PDF file.');
      hasError = true;
    } else {
      setError('');
    }

    if (!textInput.trim()) {
      setTextError('Text input cannot be empty.');
      hasError = true;
    } else if (textInput.length > 5000) {
      setTextError('Text exceeds the 5000-character limit.');
      hasError = true;
    } else {
      setTextError('');
    }

    if (hasError) return;

    setLoading(true);
    setSuccessMessage('');
    setError('');

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('textInput', textInput);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('File and text uploaded successfully.');
      setPdfFile(null);
      setTextInput('');
      if (onUploadSuccess) onUploadSuccess(response.data);
    } catch (err) {
      setError('There was an error uploading your file and text. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload PDF and Text</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="pdfFile">Upload PDF File:</label>
          <input
            type="file"
            id="pdfFile"
            className="input-field"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="textInput">Text (Max 5000 characters):</label>
          <textarea
            id="textInput"
            className="textarea-field"
            value={textInput}
            onChange={handleTextChange}
            rows="6"
            placeholder="Enter text here"
          />
          <p className="word-count">
            {textInput.trim().length} / 5000 characters
          </p>
          {textError && <p className="error-message">{textError}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Currently uploading' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
