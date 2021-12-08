import React, { useContext, useEffect, useState } from 'react';

import useStyles from './Styles';
import { Box, Container, TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL } from 'utils/makeReq';
import { AuthContext } from 'contexts/AuthContext';

const Login = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, user } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: '',
    remember: false,
  };

  let redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // console.log(`redirect`, redirect);

    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: state.email,
        password: state.password,
      });
      // console.log(`res`, res);
      toast.success('Login Success');
      setState(initialState);
      signInUser(res.data.token, res.data.user);
    } catch (err) {
      let errMsg = 'Something went wrong';
      console.log(`err?.response?.data?.message`, err?.response?.data?.message);
      console.log(`err?.response?.message`, err?.response?.message);
      if (err?.response?.data) errMsg = err.response.data.message;
      else errMsg = err.message;
      toast.error(errMsg);
    }
  };

  return (
    <Container>
      <div className={classes.Wrapper}>
        <Box className={classes.Main}>
          <Box className={classes.Header}>
            <Typography variant='h4' color='primary' align='center'>
              Restaurant Admin
            </Typography>
          </Box>
          <form className={classes.Form} onSubmit={handleSubmit}>
            <TextField
              type='email'
              placeholder='Email'
              value={state.email}
              onChange={handleTextChange}
              name='email'
              id='email'
              fullWidth
              variant='outlined'
              style={{ marginBottom: '2rem' }}
              label='Email'
            />

            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              value={state.password}
              onChange={handleTextChange}
              name='password'
              id='password'
              fullWidth
              variant='outlined'
            />

            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginTop: 20, marginBottom: '1rem' }}
            >
              Login
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
