import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css"

const ResumeUpload = ({onUploadSuccess}) => {
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
        onUploadSuccess(true);
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

    // FormData to send file and text as POST request
    const formDataResume = new FormData();
    formDataResume.append('resume_file', pdfFile);
    const jobDescriptionData = { job_description: textInput };

    try {
      // Send the data to your backend API (replace URL with your backend endpoint)
      const response = await axios.post('http://localhost:3000/api/resume-upload', formDataResume, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('File uploaded successfully:',response.data);
      setPdfFile(null);  // Clear file input after successful upload
        // Clear text input after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('There was an error uploading your file. Please try again.');
    } finally {
      setLoading(false);
    }

    try {
      // Send the data to your backend API (replace URL with your backend endpoint)
      const response = await axios.post('http://localhost:3000/api/job-description', jobDescriptionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Text uploaded successfully:',response.data);
    // Clear file input after successful upload
      setTextInput('');  // Clear text input after successful upload
    } catch (error) {
      console.error('Error uploading text:', error);
      setError('There was an error uploading your text. Please try again.');
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
            className='input-field'
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="textInput">Text (Max 5000 characters):</label>
          <textarea
            id="textInput"
            className='textarea-field'
            value={textInput}
            onChange={handleTextChange}
            rows="6"
            placeholder="Enter text here"
          />
          <p className="word-count">
            {textInput.trim().split(/\s+/).length} / 5000 characters
          </p>
        </div>

        <button type="submit" className='submit-btn' disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;