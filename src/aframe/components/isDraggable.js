/**
 * @file isDraggable.js
 * AFrame component that allows for components to placed via drag/drop.
 */

/* globals AFRAME */

import {
  MODE_COMPONENT_PLACING,
  OPEN_EXPERIENCE_COMPONENT_EDIT
} from '../../constants';
import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

const isDraggable = {
  multiple: true,
  timeout: null,
  init() {
    this.updateDraggable();
  },
  remove() {
    this.setNotDraggable();
  },
  didReceiveRoute() {
    this.updateDraggable();
  },
  updateDraggable() {
    if (this.router) {
      const {
        match: {
          params: { editorMode }
        }
      } = this.router;
      if (editorMode === MODE_COMPONENT_PLACING) {
        this.setDraggable();
      } else {
        this.setNotDraggable();
      }
    }
  },
  setDraggable() {
    this.el.setAttribute('click-drag', true);
    this.el.addEventListener('dragend', this.dropHandler.bind(this));
  },
  setNotDraggable() {
    this.el.removeAttribute('click-drag');
    this.el.removeEventListener('dragend', this.dropHandler.bind(this));
    clearTimeout(this.timeout);
  },
  dropHandler() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const { dispatch, user } = this.props;
      const {
        match: {
          params: { editorMode, sceneSlug }
        }
      } = this.router;

      const id = this.el.getAttribute('id');
      if (id && editorMode === MODE_COMPONENT_PLACING) {
        const { x: field_x, y: field_y, z: field_z } = this.el.getAttribute(
          'position'
        );
        dispatch({
          type: OPEN_EXPERIENCE_COMPONENT_EDIT,
          user,
          sceneSlug,
          id,
          fields: {
            field_x,
            field_y,
            field_z
          }
        });
      }
    }, 200);
  }
};

AFRAME.registerComponent(
  'is-draggable',
  connectRedux(state => ({
    user: state.user
  }))(
    connectRouter(
      isDraggable,
      '/experience/vreditor/:experienceSlug/:sceneSlug/:editorMode?'
    )
  )
);
