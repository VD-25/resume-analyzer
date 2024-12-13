import React, { useState } from 'react';
import { uploadResume } from '../../api/resume';
import { submitJobDescription } from '../../api/jobDescription';
import { getToken } from '../../utils/token';
import { storeData } from '../../api/storeData';
import { Player } from '@lottiefiles/react-lottie-player';
import Spinner from '../shared/Spinner';
import "../../styles/styles.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const isFormValid = () => {
    return file && textInput.trim().length > 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

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
      setError('Text exceeds the 10,000-character limit.');
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
    
    // Reset the error message before starting the loading
    setError('');
  
    setLoading(true);
    setSuccessMessage('');
    try {
      const sessionId = getToken();
      if (!sessionId) {
        throw new Error('User is not authenticated. Please log in.');
      }
  
      const resumeResponse = await uploadResume(file, sessionId);
      const jobDescriptionResponse = await submitJobDescription(textInput, sessionId);
      
      // Assuming that resumeResponse and jobDescriptionResponse return objects with textContent or equivalent
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
  
  const getButtonText = () => {
    if (loading) return 'Uploading...';
    if (!file) return 'Upload a File (PDF / DOCX)';
    if (!textInput.trim()) return 'Enter Job Description';
    return 'Upload Resume';
  };
  return (
    <div className="form-container">
      {/* Form Heading */}
      <h2 className="form-title">Upload Your Resume & Job Description</h2>
      <p className="form-subtitle">File must be 2MB or less.</p>

      {/* Success/Error Message */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-content">
        {/* File Upload Section */}
        <div className="input-group">
          <label htmlFor="file" className="input-label">Choose a Resume File (PDF/DOCX)</label>
          <input
            type="file"
            id="file"
            className="input-field"
            accept=".pdf, .docx"
            onChange={handleFileChange}
          />
        </div>

        {/* Job Description Input Section */}
        <div className="input-group">
          <label htmlFor="textInput" className="input-label">Job Description (Max 10,000 characters)</label>
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

        {/* Loading Spinner */}
        {loading && <Spinner />}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className={`w-full p-3 rounded-lg text-white font-medium
            ${isFormValid() && !loading 
              ? 'bg-blue-1000 hover:bg-blue-1000' 
              : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {getButtonText()}
        </button>
      </form>

      {/* Animation */}
      <div className="animation-container">
        <Player
          autoplay
          loop
          src="/upload.json"
          className="lottie-animation"
        />
      </div>
    </div>
  );
};

export default ResumeUpload;
