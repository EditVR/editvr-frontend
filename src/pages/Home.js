/**
 * @file Home.js
 * Exports a React component that renders EditVR's home page.
 */

import React from 'react';
import { Typography } from '@material-ui/core';

import { HomeLayout } from '../layouts';

const Home = () => (
  <HomeLayout>
    <Typography type="body1">
      <b>EditVR is a free, open-source WebVR editor</b> that lets you produce
      interactive and affordable 360 tours and VR stories. EditVR makes
      immersive experiences available to everyone using devices they already
      own. Nothing to buy, download, or install!
    </Typography>
  </HomeLayout>
);

export { Home };
