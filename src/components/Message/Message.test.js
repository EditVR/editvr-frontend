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

  it('Can render an error message', () => {
    expect(
      renderer
        .create(<Message type="error">Error: your input is borked lol</Message>)
        .toJSON()
    ).toMatchSnapshot();
  });

  it('Can render an info message', () => {
    expect(
      renderer
        .create(
          <Message type="info">
            Hey: you might want to know about this lol
          </Message>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
