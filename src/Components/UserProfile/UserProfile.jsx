import React from 'react'
import './UserProfile.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import getCookieValue from '../../GetCookie'

const UserProfile = () => {
    useEffect(() => {
        getUserProfile();
    }, [])
    const [userProfile, setUserProfile] = useState({});
    const getUserProfile = async () => {
        try {
            const accessToken = getCookieValue('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            const res = await axios.get('http://localhost:8000/profile/', config);
            // console.log(res.data);
            setUserProfile(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const accessToken = getCookieValue('accessToken')
            const { data } = await axios.get(`http://127.0.0.1:8000/intern/rec/?user=${userProfile.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const viewApplied = async (e) => {
        try {
            const accessToken = getCookieValue('accessToken')
            const { data } = await axios.get(`http://127.0.0.1:8000/intern/apply/?user=${userProfile.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(data);
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
            {userProfile && <button onClick={handleClick}>View Recommended Internships</button>}
            <br /><br />
            {userProfile && <button onClick={viewApplied}>View Applied Internships</button>}

            {/* Apply Internships */}
            {/* Delete Applied Internships  */}
        </div>
    )
}

export default UserProfile