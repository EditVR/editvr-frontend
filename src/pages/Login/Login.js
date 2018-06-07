/**
 * @file Login.js
 * Exports a React component that renders EditVR's login.
 */

import React from 'react';

import { LoginForm } from '../../components';
import { ThinLayout } from '../../layouts';

const Login = () => (
  <ThinLayout title="Log into EditVR">
    <LoginForm />
  </ThinLayout>
);

export default Login;
