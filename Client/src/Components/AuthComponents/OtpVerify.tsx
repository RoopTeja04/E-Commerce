import React, { useState } from 'react';
import { VerifyOTPUser, ResendOTP } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/AuthStore';

const OtpVerify = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { tempEmail, setAuth } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await VerifyOTPUser({ TempEmail: tempEmail, OTP: otp });
            if (response.status === 200) {
                setAuth(response.data.user, response.data.Token);
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const handleResend = async () => {
        try {
            await ResendOTP(tempEmail!);
            alert('OTP resent successfully');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Verify OTP</h2>
            <p>Sent to: {tempEmail}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>OTP:</label>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Verify</button>
            </form>
            <button onClick={handleResend} style={{ marginTop: '10px' }}>Resend OTP</button>
        </div>
    );
};

export default OtpVerify;