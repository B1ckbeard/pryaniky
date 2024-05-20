import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import {
  AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme
} from '@mui/material';
import routes from '../routes';

const Header = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#424242',
      },
    },
  });

  const handleLogOut = () =>{
    logOut();
    navigate(routes.loginPage());
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Prianiky
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
};

export default Header;
