/**
 * @file connectRouter.test.js
 * Contains tests for connectRouter.
 */

import connectRouter from './connectRouter';

describe('aframe->utils->connectRouter()', () => {
  it('Can connect an AFrame component to React Router.', () => {
    const init = jest.fn();
    const didReceiveRoute = jest.fn();
    const shouldComponentUpdateRouting = jest.fn(() => true);
    const connected = connectRouter(
      {
        init,
        didReceiveRoute,
        shouldComponentUpdateRouting
      },
      '/experience/vreditor/:experienceSlug/:sceneSlug',
      {
        listen: jest.fn(() => jest.fn()),
        location: {
          pathname: '/experience/vreditor/experience/scene'
        }
      }
    );

    // Execute the init handler, as AFrame would.
    connected.init();
    expect(init).toHaveBeenCalledTimes(1);
    expect(connected).toMatchSnapshot();

    // Run router change handlers.
    connected.handleRouterChange.call(connected);
    expect(connected.shouldComponentUpdateRouting).toHaveBeenCalledTimes(1);
    expect(didReceiveRoute).toHaveBeenCalledTimes(1);
  });

  it('Does remove its subscription to router history when destructed..', () => {
    const remove = jest.fn();
    const unsubscribe = jest.fn();
    const listen = jest.fn(() => unsubscribe);
    const connected = connectRouter(
      { remove },
      '/experience/vreditor/:experienceSlug/:sceneSlug',
      {
        listen,
        location: {
          pathname: '/experience/vreditor/experience/scene'
        }
      }
    );

    // Execute the init handler, as AFrame would.
    connected.init();

    // Un-mount component and note that the subscription to router is destructed.
    connected.remove();
    expect(remove).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
