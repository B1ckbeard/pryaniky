import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes';
import { useAuth } from '../hooks';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userAuthError, setUserAuthError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

  const authUser = async () => {
    try {
      const response = await axios.post(routes.loginUrl(), { username: username, password: password });
      if (response.status === 200) {
        if (response.data.error_code === 2004) {
          setUserAuthError(true);
        } else {
          const token = response.data.data.token;
          console.log('token>>', token);
          return token;
        }
        setNetworkError(false);
      }
    } catch (e) {
      console.log('error>>', e);
      setNetworkError(true);
    }
  }

  const loginUser = () => {
    authUser().then(token => {
      if (token !== undefined) {
        logIn(token);
        navigate(routes.mainPage());
      }
    })
  };

  const handleSubmit = (event) => {
    setNetworkError(false);
    loginUser();
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Box
      component="form"
      sx={style}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {userAuthError ? (
        <Alert severity="error">Incorrect username or password</Alert>
      ) : null}
      {networkError ? (
        <Alert severity="error">Network error</Alert>
      ) : null}
      <TextField
        autoFocus
        label="Username"
        value={username}
        error={userAuthError}
        onChange={(event) => {
          setUsername(event.target.value);
          setUserAuthError(false);
        }}
        margin="normal"
        fullWidth
        required
      />
      <TextField sx={{ marginBottom: '20px' }}
        label="Password"
        type="password"
        value={password}
        error={userAuthError}
        onChange={(event) => {
          setPassword(event.target.value);
          setUserAuthError(false);
        }}
        margin="normal"
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        margin="normal"
        fullWidth
      >
        Login
      </Button>
    </Box>
  )
};

export default LoginPage;
