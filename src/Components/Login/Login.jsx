import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../Actions/userActions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8000/login/', {
                email,
                password
            });
            const id = data.id;
            const isAdmin = data.isadmin;
            const payload = { email: email, id: id, isAdmin: isAdmin };
            // console.log(payload);
            const accessToken = data.token.access;
            const expirationDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
            document.cookie = `accessToken=${accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
            dispatch(loginSuccess(payload))
        }
        catch (error) {
            console.log(error);
        }
    }
    const state = useSelector((state) => { return state });
    const viewState = () => {
        console.log(state);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="">Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={viewState}>View State</button>
        </div>
    )
}

export default Login;