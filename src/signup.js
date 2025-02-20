import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email || !password || !phoneNumber) {
      alert('Please fill out all the required fields.');
      return;
    }
    // Store name and email in local storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    alert(`Welcome, ${name}! You have successfully signed up.`);
    navigate('/Welcome'); // Navigate to the Welcome page
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ width: 500, padding: 4, boxShadow: 3 }}>
        <CardContent>
          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <LockOutlinedIcon fontSize="large" color="primary" style={{ transform: 'scale(1.5)' }} />
          </div>
          {/* Title */}
          <Typography variant="h4" component="div" align="center" gutterBottom>
            AI Blog Creator - Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Join us and start creating amazing AI-powered blogs!
          </Typography>
          <br />
          {/* Name */}
          <TextField
            id="name"
            label="Full Name"
            variant="outlined"
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
            required
          />
          {/* Email */}
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            size="medium"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
            required
          />
          {/* Phone Number */}
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            size="medium"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (123) 456-7890"
            fullWidth
            sx={{ marginBottom: 3 }}
            required
            inputProps={{
              inputMode: 'tel',
              pattern: '[0-9]*'
            }}
          />
          {/* Password */}
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="medium"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
            required
          />
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{ padding: '12px', fontSize: '1rem', marginTop: '10px' }}
          >
            Sign Up
          </Button>
          {/* Login link */}
          <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{' '}
            <Link onClick={() => navigate('/login')} color="primary" variant="body2" style={{ cursor: 'pointer' }}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
