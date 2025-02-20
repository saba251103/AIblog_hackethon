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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    alert('Welcome back! You have successfully logged in.');
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
            Blog-AI
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Welcome back! Sign in to continue your AI blogging journey
          </Typography>
          <br />
          
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
            sx={{ marginBottom: 2 }}
            required
          />
          
          {/* Remember me & Forgot password */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link href="#" variant="body2" color="primary">
              Forgot password?
            </Link>
          </Box>
          
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{ padding: '12px', fontSize: '1rem', marginBottom: 2 }}
          >
            Sign In
          </Button>
          
          {/* Sign up link */}
          <Typography align="center" variant="body2">
            Don't have an account?{' '}
            <Link
              onClick={() => navigate('/signup')}
              color="primary"
              variant="body2"
              style={{ cursor: 'pointer' }}
            >
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}