/**
 * @file ThinLayout.test.js
 * Contains tests for ThinLayout.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import ThinLayout from './ThinLayout';

describe('<ThinLayout />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(
          <ThinLayout>
            <div>child</div>
          </ThinLayout>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
