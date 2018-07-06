/**
 * @file connectRedux.test.js
 * Contains tests for connectRedux.
 */

import connectRedux from './connectRedux';

describe('aframe->utils->connectRedux()', () => {
  it('Can connect an AFrame component to Redux.', () => {
    const didReceiveProps = jest.fn();
    const shouldComponentUpdate = jest.fn(() => true);
    const init = jest.fn();
    const remove = jest.fn();
    const unsubscribe = jest.fn();
    const subscribe = jest.fn(() => unsubscribe);
    const getState = jest.fn(() => ({
      openExperience: {
        item: {}
      }
    }));
    const dispatch = jest.fn();

    const connected = connectRedux(
      state => ({
        experience: state.openExperience
      }),
      dispatcher => ({
        dispatch: dispatcher
      }),
      {
        subscribe,
        getState,
        dispatch
      }
    )({
      didReceiveProps,
      init,
      shouldComponentUpdate,
      remove
    });

    // Expect the connected object to have a specific shape.

    // Execute the init handler, as AFrame would.
    connected.init();
    expect(init).toHaveBeenCalledTimes(1);
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(connected).toMatchSnapshot();

    // Run state change handlers.
    connected.handleStateChange.call(connected);
    expect(connected.shouldComponentUpdate).toHaveBeenCalledTimes(1);
    expect(didReceiveProps).toHaveBeenCalledTimes(1);

    // Un-mount component and note that the subscription to state is destructed.
    connected.remove();
    expect(remove).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
