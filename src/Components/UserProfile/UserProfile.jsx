import React from 'react'
import './UserProfile.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
    useEffect(() => {
        getUserProfile();
    }, [])
    const [userProfile, setUserProfile] = useState({});
    const getUserProfile = async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            const res = await axios.get('http://localhost:8000/profile/', config);
            console.log(res.data);
            setUserProfile(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {userProfile && userProfile.name}
            <br />
            {userProfile && userProfile.email}
            <br /><br />
            <button onClick={() => {
                window.localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }}>Logout</button>
        </div>
    )
}

export default UserProfile