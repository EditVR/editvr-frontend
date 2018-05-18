/**
 * @file Login.js
 * Exports a React component that renders EditVR's login.
 */

import React from 'react';
import { Typography } from '@material-ui/core';

import { LoginForm } from '../../components';
import { ThinLayout } from '../../layouts';

const Login = () => (
  <ThinLayout>
    <Typography variant="headline">Log into EditVR</Typography>
    <LoginForm />
  </ThinLayout>
);

export default Login;
