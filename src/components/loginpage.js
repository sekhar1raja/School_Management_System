import React, { useState } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-dropdown/style.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import logo from './logo1.png';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [role, setRole] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setRole(option.value);
    setRoleError(''); // Clear role error when a role is selected
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const options = [
    { value: 1, label: 'admin' },
    { value: 2, label: 'student' },
    { value: 3, label: 'professor' },
  ];

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
    let errorMessage = '';
  
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      errorMessage += 'Invalid email address. ';
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (!password) {
      setPasswordError('Password is required');
      errorMessage += 'Password is required. ';
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    if (!role) {
      setRoleError('Role is required');
      errorMessage += 'Role is required. ';
      isValid = false;
    } else {
      setRoleError('');
    }
  
    if (!isValid) {
      setMessage(`Login failed: ${errorMessage} Please enter valid credentials.`);
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
  
      console.log('Status Code:', response.status, 'Status Text:', response.statusText);  // Log status code and text
      const result = await response.json();
      console.log('Response JSON:', result);  // Log the entire response JSON
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      if (!result.roles || !result.roles.id) {
        throw new Error('Role ID is missing from the response.');
      }
  
      localStorage.setItem('userRole', result.roles.id);
      localStorage.setItem('userId', result.userid);
      localStorage.setItem('firstName', result.firstName);
      localStorage.setItem('CourseId', result.coursesOffered?.courseOfferedId || '');
      localStorage.setItem('semester', result.currentSemester);
  
      switch (result.roles.id) {
        case 1:
          navigate('/Dashboard');
          break;
        case 2:
          navigate('/TeacherDashboard');
          break;
        case 3:
          navigate('/studentannouncements');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setMessage('Login failed: Please check your credentials and try again.');
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
            <Typography component="h1" variant="h5" sx={{ paddingTop: 5 }}>
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
