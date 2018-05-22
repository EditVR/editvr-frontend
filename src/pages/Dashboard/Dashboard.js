/**
 * @file Dashboard.js
 * Exports a React component that render's EditVR's editorial dashboard.
 */

import React from 'react';
import { Typography } from '@material-ui/core';

import { ThinLayout } from '../../layouts';

const Login = () => (
  <ThinLayout>
    <Typography variant="headline">Dashboard</Typography>
    <Typography>Eventually this will be a dashboard.</Typography>
  </ThinLayout>
);

export default Login;
