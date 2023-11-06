import React, { useState } from 'react';
import './UploadResume.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getCookieValue from '../../GetCookie';

const UploadResume = () => {
    const [resume, setResume] = useState(null); // Initialize resume state to null
    const { userId } = useSelector((state) => state.user);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the selected file
        setResume(selectedFile); // Store the selected file in the state
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (resume) {
            console.log("Selected file:", resume);
            const formData = new FormData();
            formData.append('user_resume', resume); // Append the file to the FormData object with the desired field name ('resume')
            formData.append('user', userId)
            const accessToken = getCookieValue('accessToken')
            try {
                console.log(userId);
                const response = await axios.post(`http://127.0.0.1:8000/user-resume/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for form data
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log("File upload successful:", response.data);
            } catch (error) {
                console.error("File upload failed:", error);
            }
        } else {
            console.log("No file selected.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="resumeInput">Upload Resume</label>
                <input
                    type="file"
                    id="resumeInput"
                    accept=".pdf,.doc,.docx" // Add file type restrictions if needed
                    onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadResume;
