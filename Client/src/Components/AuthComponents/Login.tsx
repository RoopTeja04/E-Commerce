import React, { useState } from 'react';
import { LoginUser } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/AuthStore';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth, setTempEmail } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await LoginUser(formData);
            if (response.status === 201) {
                setAuth(response.data.user, response.data.token);
                navigate('/');
            }
        } catch (err: any) {
            if (err.response?.status === 403) {
                // Account founded but email not verified
                setTempEmail(formData.email);
                navigate('/verify-otp');
            } else {
                setError(err.response?.data?.message || 'Login failed');
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;