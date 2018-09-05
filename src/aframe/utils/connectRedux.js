/**
 * @file connectRedux.js
 * Exports a connection utility that allows for AFrame components to use Redux.
 */

import { clone, equals } from 'ramda';
import { store as defaultStore } from '../../lib/reduxStore';

/**
 * Connects a given component to Redux, and calls update handlers when global
 * states change.
 *
 * @param {func} mapStateToProps
 *   Function responsible for mapping global state to a component's local props.
 * @param {func} mapDispatchToProps
 *   Optional function that's responsible for matching dispatch actions to a
 *   component's local props object.
 * @param {object} store - Redux store that components should be connected to.
 *
 * @returns {func}
 *   Function that accepts an AFrame component, which will be connected to Redux.
 */
const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = dispatch => ({ dispatch }),
  store = defaultStore
) => aframeComponent => {
  const component = aframeComponent;

  // Default component props to an empty object.
  component.props = component.props || {};

  // Default component didReceiveProps function.
  component.didReceiveProps =
    component.didReceiveProps || function didReceiveProps() {};

  // Default shouldComponentUpdate function. This default does a shallow
  // equality check between the old props and the new incoming props to
  // determine whether or not relevant state properties have changed.
  component.shouldComponentUpdate =
    component.shouldComponentUpdate ||
    function shouldComponentUpdate(oldProps, newProps) {
      return !equals(oldProps, newProps);
    };

  // Default unsubscribeFromState function.
  component.unsubscribeFromState = () => {};

  // Add a state change handler. This function is the delegate of the store
  // subscription, so it's called when global state is updated.
  component.handleStateChange = function handleStateChange() {
    // Fetch the new state.
    const newProps = {
      ...mapStateToProps(store.getState(), this.props),
      ...mapDispatchToProps(store.dispatch, this.props)
    };

    // Execute shouldComponentUpdate to determine whether or not state should
    // be re-initialized.
    const shouldUpdate = this.shouldComponentUpdate(this.props, newProps);

    // If the component needs to update, re-initialize the props.
    if (shouldUpdate) {
      this.props = clone({
        ...this.props,
        ...newProps
      });

      // Call the update lifecycle method.
      this.didReceiveProps();
    }
  };

  // Initialize the component.
  const parentInit = component.init || function init() {};
  component.init = function componentInit() {
    // Connect state and dispatch to props.
    this.props = clone({
      ...this.props,
      ...mapStateToProps(store.getState(), this.props),
      ...mapDispatchToProps(store.dispatch, this.props)
    });

    // Subscribe to state changes, and store reference to unsubscriber.
    this.unsubscribeFromState = store.subscribe(
      this.handleStateChange.bind(this)
    );

    // Execute the parent object's init function.
    return parentInit.call(this);
  };

  // When the commponent is destructed, destroy it's subscription to the store.
  const parentRemove = component.remove || function remove() {};
  component.remove = function removeSubscription() {
    this.unsubscribeFromState();
    return parentRemove.call(this);
  };

  return component;
};

export default connect;
