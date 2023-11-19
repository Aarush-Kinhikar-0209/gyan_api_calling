import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

const ApplyInternship = () => {
    const [recommendedInternships, setRecommendedInternships] = useState([]);
    const [internshipId, setInternshipId] = useState('');
    const userProfile = useSelector((state) => { return state.user });
    const viewRecommendedInternships = async (e) => {
        e.preventDefault();
        try {
            console.log(userProfile);
            const accessToken = window.localStorage.getItem('accessToken');
            const { data } = await axios.post(`http://127.0.0.1:8000/intern/rec/`,
                { user: userProfile.userId },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
            setRecommendedInternships(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const apply = async (e) => {
        e.preventDefault();
        if (!internshipId) {
            alert("Please enter internship id");
            return;
        }
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            console.log(accessToken);
            const { data } = await axios.post(`http://127.0.0.1:8000/intern/apply/`,
                { user: userProfile.userId, internship_id: internshipId },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={viewRecommendedInternships}>View Recommended Internships</button>
            <br /><br />
            <label>Enter Internship Id</label>
            <input type="number" value={internshipId} onChange={(e) => setInternshipId(e.target.value)} />
            <button onClick={apply}>Apply</button>
        </div>
    )
}

export default ApplyInternship