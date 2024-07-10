import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';  // Import styles for the dropdown
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './logo1.png';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [role, setRole] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setRole(option.value);
    setRoleError(''); // Clear role error when a role is selected
  };

  const options = [
    { value: 1, label: 'admin' },
    { value: 2, label: 'student' },
    { value: 3, label: 'teacher' },
  ];

  const defaultOption = options[0];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!role) {
      setRoleError('Role is required');
      isValid = false;
    } else {
      setRoleError('');
    }

    if (!isValid) {
      return;
    }

    const userData = {
      email,
      password,
      roles: {
        id: role,
      },
    };

    try {
      const response = await fetch('http://localhost:8080/user/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result.roles);

      // Store user role in local storage
      localStorage.setItem('userRole', result.roles.id);

      if (result.roles.id === 1) {
        setMessage('Admin login successful');
      } else if (result.roles.id === 2) {
        setMessage('Student login successful');
      } else if (result.roles.id === 3) {
        setMessage('Teacher login successful');
      } else {
        setMessage('Unknown role');
      }

      navigate("/dashboard");

      console.log(result);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setMessage('Login failed');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1619512673224-91cfb2688284?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <img src={logo} alt="Logo" />
           
            <Typography component="h1" variant="h5" sx={{
              paddingTop:5,
            }}>
              Sign in with Your school Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
              />
              <Dropdown
                options={options}
                onChange={handleSelect}
                value={role ? options.find(opt => opt.value === role) : null}
                placeholder="Select an option"
              />
              {roleError && (
                <Typography color="error" variant="body2">
                  {roleError}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In 
              </Button>
              {message && (
                <Typography color="error" variant="body2">
                  {message}
                </Typography>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
