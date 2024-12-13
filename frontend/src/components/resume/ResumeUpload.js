import React, { useState } from 'react';
import { uploadResume } from '../../api/resume'; // Import the API function for resume upload
import { submitJobDescription } from '../../api/jobDescription'; // Import the API function for job description
import "../../styles/styles.css"; // Update this file with new styles
import Spinner from '../shared/Spinner';
import { getToken } from '../../utils/token';
import { storeData } from '../../api/storeData';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      // Validate file type (allow PDF and DOCX)
      if (fileSize > 2 * 1024 * 1024) {
        setError('File must be smaller than 2MB.');
        setFile(null);
      } else if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(file);
        setError('');
      } else {
        setError('Please upload a valid PDF or DOCX file.');
        setFile(null);
      }
    }
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 10000) {
      setTextInput(inputText);
      setError('');
    } else {
      setError('Text exceeds the 10000-character limit.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      setError('Please upload a PDF or DOCX file.');
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
      const sessionId = getToken();
      if (!sessionId) {
        throw new Error('User is not authenticated. Please log in.');
      }
      const resumeResponse = await uploadResume(file, sessionId);
      console.log('Resume Response:', resumeResponse); 
  
      const jobDescriptionResponse = await submitJobDescription(textInput, sessionId);
  
      const resumeText = resumeResponse.text || resumeResponse.textContent || resumeResponse.extractedText;
      const jobDescription = jobDescriptionResponse.cleanedText;
  
      if (!resumeText) {
        throw new Error('No text extracted from the resume file.');
      }
  
      const storeResponse = await storeData({
        sessionId,
        extractTextFromPdf: resumeText,  
        jobDescription,                  
      });
  
      setSuccessMessage('Resume and job description submitted successfully.');
      setFile(null);
      setTextInput('');
    } catch (error) {
      setError(error.message || 'There was an error uploading your file and/or text. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container">
      <h2>Upload PDF/DOCX File with Job Description 👋</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="file">Choose a PDF or DOCX file</label>
          <input
            type="file"
            id="file"
            className="input-field"
            accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="textInput">Text (Max 10000 characters):</label>
          <textarea
            id="textInput"
            className="textarea-field"
            value={textInput}
            onChange={handleTextChange}
            rows="6"
            placeholder="Paste the job description here..."
          />
          <p className="word-count">{textInput.length} / 10000 characters</p>
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
