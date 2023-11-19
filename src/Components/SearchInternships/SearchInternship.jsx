import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const SearchInternship = () => {
    const [userSkills, setUserSkills] = useState(["HTML", "CSS", "JavaScript"]);
    const [title, setTitle] = useState('Web Development')
    const [duration, setDuration] = useState('6 weeks');
    const searchBySkills = async () => {
        const accessToken = window.localStorage.getItem('accessToken');
        const { data } = await axios.get(`http://127.0.0.1:8000/intern/search/skills/?user_skills=${userSkills}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('Search By Skills\n', data);
    }
    const searchByTitle = async () => {
        const accessToken = window.localStorage.getItem('accessToken');
        const { data } = await axios.get(`http://127.0.0.1:8000/intern/search/title/?search=${title}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('Search By Title\n', data);
    }
    const searchByDuration = async () => {
        const accessToken = window.localStorage.getItem('accessToken');
        const { data } = await axios.get(`http://127.0.0.1:8000/intern/search/duration/?duration=${duration}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('Search By Duration\n', data);
    }
    useEffect(() => {
        searchBySkills();
        searchByTitle();
        searchByDuration();
    }, []);
    return (
        <div>SearchInternship</div>
    )
}

export default SearchInternship