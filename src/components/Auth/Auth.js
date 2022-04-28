import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({});
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let fieldName = '';

    if (data.get('email') === '') {
      fieldName += 'Email, ';
    }
    if (data.get('password') === '') {
      fieldName += 'Password, ';
    }
    if (isSignUp) {
      if (data.get('firstName') === '') {
        fieldName += 'First Name, ';
      }
      if (data.get('lastName') === '') {
        fieldName += 'Last Name, ';
      }
      fieldName === ''
        ? dispatch(
            signup(
              {
                full_name: data.get('firstName') + ' ' + data.get('lastName'),
                email: data.get('email'),
                role: 'user',
                password: data.get('password'),
              },
              setAlertMessage
            )
          )
        : setAlertMessage({
            severity: 'error',
            message: `Field [${fieldName.slice(0, -2)}] tidak boleh kosong`,
          });
    } else {
      fieldName === ''
        ? dispatch(
            signin(
              {
                email: data.get('email'),
                password: data.get('password'),
              },
              history,
              setAlertMessage
            )
          )
        : setAlertMessage({
            severity: 'error',
            message: `Field [${fieldName.slice(0, -2)}] tidak boleh kosong`,
          });
    }
    setDisplayAlert(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            {!isSignUp ? (
              <>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </>
            ) : (
              <>
                <TextField
                  margin='normal'
                  required
                  id='firstName'
                  label='First Name'
                  name='firstName'
                  autoComplete='firstName'
                  autoFocus
                  sx={{ width: '45%' }}
                />
                <TextField
                  margin='normal'
                  required
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                  sx={{ width: '45%', marginLeft: '10%' }}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </>
            )}
            <Button
              type='submit'
              fullWidth
              color='warning'
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setDisplayAlert(false);
                  }}>
                  {!isSignUp
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </Button>
              </Grid>
            </Grid>
            {displayAlert && (
              <Alert
                severity={alertMessage.severity}
                onClose={() => {
                  setDisplayAlert(false);
                }}>
                {alertMessage.message}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
