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
import 'react-dropdown/style.css';  // Import styles for the dropdown
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Registration() {
  const [role, setRole] = useState(null);

  const handleSelect = (option) => {
    setRole(option.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      gender: data.get('gender'),
      roles: {
        id: role,
      },
      registrationTime: new Date().toISOString(), // Assuming registration time is current time
      contactNumber: data.get('contactNumber'),
      // fatherName: data.get('fatherName'),
      // motherName: data.get('motherName'),
      // alternateNumber: data.get('alternateNumber'),
      // address1: data.get('address1'),
      // address2: data.get('address2'),
      // city: data.get('city'),   
      // state: data.get('state'),
      // country: data.get('country'),
      // postal_code: data.get('postal_code'),
      // academicSection: {
      //   sectionId: 0, // You may need to update this based on your schema
      //   studentClass: data.get('studentClass'),
      //   section: data.get('section'),
      // },
    };

    try {
      const response = await fetch('http://localhost:8080/user/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response JSON
      let result;
      try {
        result = await response.json();
      } catch (error) {
        console.error('Invalid JSON response from server:', error);
        throw new Error('Invalid JSON response from server');
      }

      // Check if registration was successful
      if (result.success) {
        console.log('Registration successful');
        // Redirect the user to a login page or display a success message
      } else {
        console.log('Registration failed');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      // Display an error message to the user
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
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
                label="FirstName"
                type="text"
                name="firstName"
                autoComplete="FirstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="LastName"
                type="text"
                id="lastName"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="Enter Password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="Email"
                id="Email"
                autoComplete="Enter Email Id"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                label="Gender"
                type="text"
                id="gender"
                autoComplete="Enter Gender"
              />
              <Dropdown
                options={options}
                onChange={handleSelect}
                value={defaultOption}
                placeholder="Select an option"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contactNumber"
                label="contactNumber"
                type="text"
                id="contactNumber"
                autoComplete="Enter contactNumber"
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="fatherName"
                label="Father Name"
                type="text"
                id="fathername"
                autoComplete="Enter Father Name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="motherName"
                label="Mother Name"
                type="text"
                id="mothername"
                autoComplete="Enter Mother Name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="alternateNumber"
                label="Home Number"
                type="text"
                id="alternativenumber"
                autoComplete="Enter Home Number"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="address1"
                label="Address1"
                type="text"
                id="address1"
                autoComplete="Enter Address1 "
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="address2"
                label="Address2"
                type="text"
                id="Address2"
                autoComplete="Enter Address2"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                autoComplete="Enter City"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                type="text"
                id="state"
                autoComplete="Enter State"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
                autoComplete="Enter Country"
              /><TextField
              margin="normal"
              required
              fullWidth
              name="postal_code"
              label="Zip code"
              type="text"
              id="Zipcode"
              autoComplete="Enter Zip Code"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="section"
                label="Section"
                type="text"
                id="section"
                autoComplete="Enter your current Section"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="studentClass"
                label="StudentClass"
                type="text"
                id="studentClass"
                autoComplete="Enter studentClass"
              /> */}

              {/* Add other fields as necessary */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
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

export default Registration;
