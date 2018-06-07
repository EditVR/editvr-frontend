/**
 * @file ExperienceCreate.js
 * Exports a React component that renders EditVR's experience creation page.
 */

import React from 'react';

import { DashboardLayout } from '../../layouts';
import { ExperienceForm } from '../../components';

const ExperienceCreate = () => (
  <DashboardLayout title="Create an Experience">
    <ExperienceForm />
  </DashboardLayout>
);

export default ExperienceCreate;
