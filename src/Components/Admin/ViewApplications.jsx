import React from 'react'
import axios from 'axios'

const ViewApplications = () => {
    const handleClick = async (e) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            e.preventDefault();
            const { data } = await axios.get('http://127.0.0.1:8000/super/view-appiled-interns/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <button onClick={handleClick}>View Applications</button>
        </>
    )
}

export default ViewApplications