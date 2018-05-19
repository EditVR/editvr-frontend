/**
 * @file Loading.test.js
 * Contains tests for Loading.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import Loading from './Loading';

describe('<Loading />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(
          <Loading />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
