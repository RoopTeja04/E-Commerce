import React, { useState } from 'react';
import { RegisterUser } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/AuthStore';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        TempEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setTempEmail = useAuthStore((state) => state.setTempEmail);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await RegisterUser(formData);
            if (response.status === 201) {
                setTempEmail(formData.TempEmail);
                navigate('/verify-otp');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="TempEmail" value={formData.TempEmail} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CreateAccount;