import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
    const [CSV, setCSV] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setCSV(selectedFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (CSV) {
            try {
                const formData = new FormData();
                formData.append('file', CSV);
                const accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.post('http://127.0.0.1:8000/super/upload-csv/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log("No file selected.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="csvInput">Upload CSV</label>
                <input
                    type="file"
                    id="csvInput"
                    accept=".csv" // Add file type restrictions if needed
                    onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadCSV;
