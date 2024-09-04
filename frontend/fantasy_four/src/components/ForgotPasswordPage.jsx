import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css'; 
import BackgroundImageRotator from './BackgroundImageRotator';

const ChangePasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, new_password: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password changed successfully!');
                navigate('/login');
            } else {
                setMessage(`Password change failed: ${data.error}`);
            }
        } catch (error) {
            setMessage('An error occurred while trying to change the password.');
        }
    };

    return (
        <BackgroundImageRotator>
            <h1 style={{ fontSize: '70px' }}>Change Password</h1>
            <h3>Please enter your email and new password.</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <br />
                <label>New Password:</label>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required
                />
                <br />
                <button type="submit" id="register-button">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </BackgroundImageRotator>
    );
};

export default ChangePasswordPage;