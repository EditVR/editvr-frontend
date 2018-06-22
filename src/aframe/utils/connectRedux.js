/**
 * @file connectRedux.js
 * Exports a connection utility that allows for AFrame components to use Redux.
 */

import { store } from '../../lib/reduxStore';

/**
 * Connects a given component to Redux, and calls update handlers when global
 * states change.
 *
 * @param {func} mapStateToSchema
 *   Function responsible for mapping global state to a component's local schema.
 * @param {func} mapDispatchToSchema
 *   Optional function that's responsible for matching dispatch actions to a
 *   component's local schema object.
 *
 * @returns {func}
 *   Function that accepts an AFrame component, which will be connected to Redux.
 */
const connect = (
  mapStateToSchema = () => ({}),
  mapDispatchToSchema = dispatch => ({ dispatch })
) => aframeComponent => {
  const component = aframeComponent;

  // Default component schema to an empty object.
  component.schema = component.schema || {};

  // Default component update and shouldComponentUpdate functions.
  component.update = component.update || function update() {};
  component.shouldComponentUpdate =
    component.shouldComponentUpdate ||
    function shouldComponentUpdate() {
      return false;
    };

  // Default unsubscribe to an empty function.
  component.unsubscribe = () => {};

  // Add a state change handler. This function is the delegate of the store
  // subscription, so it's called when global state is updated.
  component.handleStateChange = function handleStateChange() {
    // Fetch the new state.
    const newState = store.getState();

    // Execute shouldComponentUpdate to determine whether or not state should
    // be re-initialized.
    const shouldUpdate = component.shouldComponentUpdate(newState);

    // If the component needs to update, re-initialize the schema state.
    if (shouldUpdate) {
      component.schema = {
        ...component.schema,
        ...mapStateToSchema(newState, component.schema)
      };
    }

    // Call the update lifecycle method.
    component.update.call(component);
  };

  // Initialize the component.
  const parentInit = component.init || function init() {};
  component.init = function componentInit() {
    // Connect state and dispatch to schema props.
    component.schema = {
      ...component.schema,
      ...mapStateToSchema(store.getState(), component.schema),
      ...mapDispatchToSchema(store.dispatch, component.schema)
    };

    // Subscribe to state changes
    component.unsubscribe = store.subscribe(
      component.handleStateChange.bind(component)
    );

    // Execute the parent object's init function.
    return parentInit.call(component);
  };

  // When the commponent is destructed, destroy it's subscription to the store.
  const parentRemove = component.remove || function remove() {};
  component.remove = function removeSubscription() {
    component.unsubscribe();
    return parentRemove.call(component);
  };

  return component;
};

export default connect;
