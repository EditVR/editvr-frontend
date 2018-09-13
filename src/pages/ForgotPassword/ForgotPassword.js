/**
 * @file ForgotPassword.js
 * Exports a React component that renders EditVR's reset password page.
 */

import React from 'react';

import { ForgotPasswordForm } from '../../components';
import { ThinLayout } from '../../layouts';

const ForgotPassword = () => (
  <ThinLayout title="Reset your EditVR Account Password">
    <ForgotPasswordForm />
  </ThinLayout>
);

export default ForgotPassword;
