/**
 * @file isExitable.js
 * AFrame component that allows for components to be selected for editing.
 */

/* globals AFRAME */

import { COMPONENT_SELECT, MODE_COMPONENT_SELECTING } from '../../constants';
import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

const isEditable = {
  multiple: true,
  clickHandler() {
    const id = this.el.getAttribute('id');
    const { dispatch } = this.props;
    const {
      match: {
        params: { editorMode }
      }
    } = this.router;

    if (id && editorMode === MODE_COMPONENT_SELECTING) {
      dispatch({
        type: COMPONENT_SELECT,
        id
      });
    }
  },
  init() {
    this.el.addEventListener('click', this.clickHandler.bind(this));
  },
  remove() {
    this.el.removeEventListener('click', this.clickHandler.bind(this));
  }
};

AFRAME.registerComponent(
  'is-editable',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(
      isEditable,
      '/experience/vreditor/:experienceSlug/:sceneSlug/:editorMode?'
    )
  )
);
