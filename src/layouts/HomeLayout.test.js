/**
 * @file HomeLayout.test.js
 * Contains tests for HomeLayout.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import { HomeLayout } from './index';

describe('<HomeLayout />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(
          <HomeLayout>
            <div>child</div>
          </HomeLayout>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
