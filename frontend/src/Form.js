import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [charWarning, setCharWarning] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const validateFile = (file) => {
    return file && file.type === 'application/pdf';
  };

  const validateCharCount = (text) => {
    return text.length <= 5000;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    if (file && !validateFile(file)) {
      setResumeError('Unsupported file type.');
    } 
    else {
      setResumeError('');
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharCount(text.length);
    if (text.length > 5000) {
      setCharWarning('Character limit exceeded.');
    } 
    else if (text.length > 4500) {
      setCharWarning('Character limit approaching.');
    } 
    else {
      setCharWarning('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage('');
    if (!resume || !validateFile(resume)) {
      setResumeError('Please upload a valid PDF file.');
      return;
    }
    if (!validateCharCount(jobDescription)) {
      setCharWarning('Character limit exceeded.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    try {
      // Replace these with actual API endpoints
      await axios.post('/api/resume-upload', formData);
      await axios.post('/api/job-description', { jobDescription });
      setSubmissionMessage('Submission successful!');
    } catch (error) {
      setSubmissionMessage('Error in submission. Please try again.');
    }
  };

  return (
    <form id="uploadForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="resume">Upload Resume (PDF only):</label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <span className="error">{resumeError}</span>
      </div>
      <div>
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={jobDescription}
          onChange={handleTextChange}
          maxLength="5000"
        />
        <div>
          <span>{charCount} / 5000</span>
          <span className="warning">{charWarning}</span>
        </div>
      </div>
      <button type="submit">Submit</button>
      <div>{submissionMessage}</div>
    </form>
  );
}

export default Form;
