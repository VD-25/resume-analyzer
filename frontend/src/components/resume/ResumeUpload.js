import React, { useState } from 'react';
import { uploadResume } from '../../api/resume'; // Import the API function for resume upload
import { submitJobDescription } from '../../api/jobDescription'; // Import the API function for job description
import "../../styles/styles.css";
import Spinner from '../shared/Spinner';
import { getToken } from '../../utils/token';
import { storeData } from '../../api/storeData';

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
      if (file.size > 2 * 1024 * 1024) { // Check file size in bytes
        setError('File must be smaller than 2MB.');
        setPdfFile(null);
      } else {
        setPdfFile(file);
        setError('');
      }
    } else {
      setError('Please upload a valid PDF file.');
      setPdfFile(null);
    }
  };

  // Handle text input change (and enforce word limit)
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 5000) {
      setTextInput(inputText);
      setError('');
    } else {
      setError('Text exceeds the 5000-character limit.');
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

    try {
      //const token = getToken(); // Get the saved token from localStorage
      const sessionId = getToken();
      if (!sessionId) {
        throw new Error('User is not authenticated. Please log in.');
      }
  
      // Upload PDF file
      const resumeResponse = await uploadResume(pdfFile, sessionId);
      console.log('Resume uploaded successfully:', resumeResponse);
  
      // Submit job description
      const jobDescriptionResponse = await submitJobDescription(textInput, sessionId);
      console.log('Job description submitted successfully:', jobDescriptionResponse);

      // Store data in the backend
     console.log('Payload to storeData:', {
      sessionId,
        extractTextFromPdf: resumeResponse.textContent,
        jobDescription: jobDescriptionResponse.cleanedText,
      });
    const storeResponse = await storeData({
      sessionId,
      extractTextFromPdf: resumeResponse.textContent, // Replace with the actual response field
      jobDescription: jobDescriptionResponse.cleanedText, // Replace with the actual response field
    });
    console.log('Data stored successfully in the backend:', storeResponse);

      // Success message and input reset
      setSuccessMessage('Resume and job description submitted successfully.');
      setPdfFile(null);
      setTextInput('');
    } catch (error) {
      console.error('Error during upload:', error);
      setError(error.message || 'There was an error uploading your file and text. Please try again.');
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
          <label htmlFor="pdfFile">Choose a PDF</label>
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
          <p className="word-count">{textInput.length} / 5000 characters</p>
        </div>

        {loading && <Spinner />}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
