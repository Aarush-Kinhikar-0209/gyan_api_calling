import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewAppliedInternships = () => {
    const [appliedInternships, setAppliedInternships] = useState([]);
    const user = useSelector((state) => { return state.user });
    useEffect(() => {
        if (user.userId != -1) {
            viewApplied();
        }
    }, [user])
    const viewApplied = async (e) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const { data } = await axios.get(`http://127.0.0.1:8000/intern/apply/?user=${user.userId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setAppliedInternships(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteApplication = async (internshipId) => {
        const accessToken = window.localStorage.getItem('accessToken');
        const { data } = await axios.delete(`http://127.0.0.1:8000/intern/apply/?user=${user.userId}&internship_id=${internshipId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setAppliedInternships(appliedInternships.filter(item => item.id !== internshipId));
        console.log(data)
    }
    return (
        <div>
            {appliedInternships &&
                appliedInternships.map((item, index) => (
                    <div key={item.id}>
                        {index + 1}.{item.Internship_title}
                        <button onClick={() => deleteApplication(item.id)}>
                            Remove
                        </button>
                    </div>
                ))}
        </div>
    )
}

export default ViewAppliedInternships