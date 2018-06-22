/**
 * @file connectRouter.js
 * Utility that assists in connecting AFrame components to React Router.
 */

import { matchPath } from 'react-router';
import history from '../../lib/routerHistory';

/**
 * Attaches router state to a given component's schema.
 *
 * @param {object} aframeComponent - AFrame component object.
 * @param {string} pathPattern - React Router path pattern that is expected.
 *
 * @returns {object} - AFrame component object with router state.
 */
const connect = (aframeComponent, pathPattern = null) => {
  const component = aframeComponent;

  console.log(history);

  // Default component schema to an empty object.
  component.schema = component.schema || {};

  component.schema = {
    ...component.schema,
    router: {
      history,
      match: pathPattern
        ? matchPath(history.location.pathname, {
            path: pathPattern,
            exact: pathPattern.includes('?')
          })
        : null
    }
  };

  return component;
};

export default connect;
