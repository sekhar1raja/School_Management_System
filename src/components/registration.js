import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dropdown from 'react-dropdown';
import { useNavigate } from "react-router-dom";
import 'react-dropdown/style.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Registration() {
  const [role, setRole] = useState(null);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [contactError, setContactError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setRole(option.value);
    setRoleError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');
    const gender = data.get('gender');
    const contactNumber = data.get('contactNumber');
    let isValid = true;
  
    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }
  
    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }
  
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
  
    if (!gender) {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }
  
    if (!contactNumber) {
      setContactError('Contact number is required');
      isValid = false;
    } else {
      setContactError('');
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
      firstName,
      lastName,
      email,
      password,
      gender,
      roles: {
        id: role,
      },
      registrationTime: new Date().toISOString(),
      contactNumber,
    };
  
    // Inside handleSubmit function
try {
  const response = await fetch('http://localhost:8080/user/user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      
  });

  
  if (response.ok) {
    // Handle error response from the server
    setMessage('Registration successful. Redirecting to login...');
    setTimeout(() => {
        navigate('/login');
    }, 2000);
}


} catch (error) {
  console.error('There was a problem with your registration:', error);
  setMessage('There was a problem with your registration. Please try again.');
}
  };
  
  

  const options = [
    { value: 1, label: 'admin' },
    { value: 2, label: 'student' },
    { value: 3, label: 'teacher' },
  ];

  const defaultOption = options[0];

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
            backgroundImage: 'url(https://res.cloudinary.com/dh1tomppe/image/upload/v1718066666/nursery_teacher_device_1_pnbtjw.jpg)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="FirstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                error={!!firstNameError}
                helperText={firstNameError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="lastName"
                error={!!lastNameError}
                helperText={lastNameError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="Email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                label="Gender"
                type="text"
                id="gender"
                autoComplete="gender"
                error={!!genderError}
                helperText={genderError}
              />
              <Dropdown
                options={options}
                onChange={handleSelect}
                value={defaultOption}
                placeholder="Select an option"
              />
              {roleError && <Typography color="error">{roleError}</Typography>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="contactNumber"
                label="Contact Number"
                type="text"
                id="contactNumber"
                autoComplete="contactNumber"
                error={!!contactError}
                helperText={contactError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {message && <Typography color={message.includes('successful') ? "success" : "error"}>{message}</Typography>}
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
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
