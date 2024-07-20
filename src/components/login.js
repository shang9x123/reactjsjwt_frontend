import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AuthUser from './AuthUser';
import axios from 'axios';
import Cookies from 'js-cookie';
import { base_url, expires60day, expiresday } from './config';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = AuthUser(); // Removed `http` since it was not used

    const submitForm = () => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('rootpass', 'Ahiendam123');

        const config = {
            method: 'post',
            url: base_url + 'login',
            data: data
        };

        axios.request(config)
            .then((response) => {
                //setToken(response.data.access_token, response.data.refresh_token)
                Cookies.set('token', response.data.access_token, { expires: expiresday })
                Cookies.set('refreshToken', response.data.refresh_token, { expires: expires60day })
                console.log(JSON.stringify(response.data.access_token));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login</h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)} id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)} id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
