/**
 * @file Message.test.js
 * Contains tests for Message.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import Message from './Message';

describe('<Message />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(<Message>Error: your input is borked lol</Message>)
        .toJSON()
    ).toMatchSnapshot();
  });
});
