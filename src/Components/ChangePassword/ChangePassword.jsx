import React, { useState } from 'react'
import './ChangePassword.css'
import axios from 'axios'
import getCookieValue from '../../GetCookie'

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = getCookieValue('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            const data = {
                password: password,
                password2: password2
            };
            const res = await axios.post('http://localhost:8000/changepassword/', data, config);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">New Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="">Confirm New Password</label>
                <input type="text" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                <button type="submit">Change Password</button>
            </form>
        </>
    )
}


export default ChangePassword