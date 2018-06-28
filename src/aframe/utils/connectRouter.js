/**
 * @file connectRouter.js
 * Utility that assists in connecting AFrame components to React Router.
 */

import { matchPath } from 'react-router';

import defaultHistory from '../../lib/routerHistory';
import shallowEqual from './shallowEqual';

/**
 * Helper method that takes history and a path pattern and turns it into a match object.
 *
 * @param {object} history - Object containing router history.
 * @param {string} path - React Router path pattern that is expected.
 *
 * @returns {object} - Match object complete with parameters.
 */
const parseMatch = (history, path = null) =>
  path
    ? matchPath(history.location.pathname, {
        path,
        exact: path.includes('?')
      })
    : {};

/**
 * Attaches router props to a given component.
 *
 * @param {object} aframeComponent - AFrame component object.
 * @param {string} pathPattern - React Router path pattern that is expected.
 * @param {object} history - History object, from the history npm pkg.
 *
 * @returns {object} - AFrame component object with router props.
 */
const connect = (
  aframeComponent,
  pathPattern = null,
  history = defaultHistory
) => {
  const component = aframeComponent;

  // Default component router to an empty object.
  component.router = component.router || {};

  // Default component update function.
  component.didReceiveRoute =
    component.didReceiveRoute || function didReceiveProps() {};

  // Default shouldComponentUpdate function. This default does a shallow
  // equality check between the old props and the new incoming props to
  // determine whether or not relevant props properties have changed.
  component.shouldComponentUpdateRouting =
    component.shouldComponentUpdateRouting ||
    function shouldComponentUpdateRouting(oldProps, newProps) {
      return !shallowEqual(oldProps, newProps);
    };

  // Default unsubscribeFromRouter function.
  component.unsubscribeFromRouter = () => {};

  // Handle changes to the route.
  component.handleRouterChange = function handleRouterChange(location, action) {
    const newProps = {
      history: {
        ...this.router.history,
        location,
        action
      },
      match: {
        ...this.router.match,
        ...parseMatch(history, pathPattern)
      }
    };

    // Execute shouldComponentUpdate to determine whether or not router props
    // should be updated.
    const shouldUpdate = this.shouldComponentUpdateRouting(
      this.router,
      newProps
    );

    // If the component needs to update, re-initialize the router props.
    if (shouldUpdate) {
      this.router = {
        ...this.router,
        ...newProps
      };

      // Call the update lifecycle method.
      this.didReceiveRoute();
    }
  };

  // Initialize the component.
  const parentInit = component.init || function init() {};
  component.init = function componentInit() {
    // Connect router history and match data to the components' router property.
    this.router = {
      ...this.router,
      history: {
        ...history
      },
      match: parseMatch(history, pathPattern)
    };

    // Subscribe to router changes and store a reference to the unsubsription func.
    this.unsubscribeFromRouter = history.listen(
      this.handleRouterChange.bind(this)
    );

    // Execute the parent object's init function.
    return parentInit.call(this);
  };

  // When the commponent is destructed, destroy it's subscription to the router.
  const parentRemove = component.remove || function remove() {};
  component.remove = function removeSubscription() {
    this.unsubscribeFromRouter();
    return parentRemove.call(this);
  };

  return component;
};

export default connect;
