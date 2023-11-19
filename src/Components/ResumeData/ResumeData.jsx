import React from 'react'
import './ResumeData.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ResumeData = () => {
    const { userId } = useSelector((state) => state.user);
    const accessToken = window.localStorage.getItem('accessToken');
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/user-data/`,
                { user: userId },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (e) => {
        const details = {
            "phone_number": "9087785657",
            "skills": "['HTML', 'React', 'C', 'CSS', 'Javascript', 'Java', 'Python', 'Android Studio', 'machine learning', 'MySQL']",
            "education": "['Universal High School', 'Prakash Junior College', 'Sardar Patel Institute']"
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/user-data/`, { user: userId, details },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        console.log(data);
    }

    return (
        <>
            <button onClick={handleClick}>View Resume Data</button>
            <button onClick={handleUpdate}>Update Resume Data</button>
        </>
    )
}

export default ResumeData