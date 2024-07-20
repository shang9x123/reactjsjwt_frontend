import React, { useEffect } from 'react'
import axiosInstance from './api';

const About = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('login');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            hehehe
        </div>
    )
}

export default About
