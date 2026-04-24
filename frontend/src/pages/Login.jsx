import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';
import img1 from '../assets/smart.png';
import img2 from '../assets/click-plus.png';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await apiPost('/api/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            if (err.message.includes('401')) {
                setError('Invalid credentials');
            } else {
                setError('Login failed, try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative Images */}
            <img src={img1} alt="" style={{ position: 'absolute', top: '0', left: '0', width: 'clamp(200px, 35vw, 450px)', zIndex: -1, opacity: 0.9, pointerEvents: 'none' }} />
            <img src={img2} alt="" style={{ position: 'absolute', bottom: '0', right: '0', width: 'clamp(200px, 35vw, 450px)', zIndex: -1, opacity: 0.9, pointerEvents: 'none' }} />

            <div className="card" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
                <div className="text-center mb-6">
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: '#111' }}>Welcome Back</h2>
                    <p style={{ color: '#666' }}>Student Management System Admin</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{ color: '#111' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label style={{ color: '#111' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="error-msg mb-4 text-center" style={{ display: 'block' }}>{error}</div>}

                    <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div style={{ marginTop: '20px', fontSize: '13.5px', color: '#64748b', textAlign: 'center' }}>
                        Demo Credentials: <strong>admin</strong> / <strong>admin123</strong>
                    </div>
                </form>
            </div>
        </div>
    );
}
