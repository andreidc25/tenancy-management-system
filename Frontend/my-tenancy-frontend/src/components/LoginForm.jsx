// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Use axios to send a POST request to your Django token endpoint
            const response = await axios.post('http://localhost:8000/api/token/', {
                username: username,
                password: password
            });

            // On success, store the authentication tokens in the browser's localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // For now, we'll just alert the user. Later, this will redirect them.
            alert('Login successful!');
            window.location.href = '/dashboard'; // A simple redirect for now

        } catch (err) {
            setError('Invalid username or password.');
            console.error('Login failed:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;