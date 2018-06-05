/**
 * @file FormMessage.test.js
 * Contains tests for FormMessage.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import FormMessage from './FormMessage';

describe('<FormMessage />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(<FormMessage>Error: your input is borked lol</FormMessage>)
        .toJSON()
    ).toMatchSnapshot();
  });
});
