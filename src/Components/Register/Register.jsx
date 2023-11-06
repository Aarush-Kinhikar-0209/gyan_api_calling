import React from 'react'
import './Register.css'
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/reg/', {
                name,
                email,
                password,
                password2
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label htmlFor="password2">Password2</label>
                <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register