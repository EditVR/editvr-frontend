/**
 * @file Register.js
 * Exports a React component that renders EditVR's login.
 */

import React from 'react';

import { RegisterForm } from '../../components';
import { ThinLayout } from '../../layouts';

const Register = () => (
  <ThinLayout title="Register for an EditVR Account">
    <RegisterForm />
  </ThinLayout>
);

export default Register;
