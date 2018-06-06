/**
 * @file ExperienceCreate.js
 * Exports a React component that renders EditVR's experience creation page.
 */

import React from 'react';

import { DashboardLayout } from '../../layouts';
import { ExperienceCreateForm } from '../../components';

const ExperienceCreate = () => (
  <DashboardLayout title="Create an Experience">
    <ExperienceCreateForm />
  </DashboardLayout>
);

export default ExperienceCreate;
