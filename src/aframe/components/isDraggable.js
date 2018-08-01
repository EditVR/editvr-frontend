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
  schema: {
    target: {
      type: 'string',
      default: ''
    }
  },
  multiple: true,
  timeout: null,
  targetEl: null,
  init() {
    this.el.addEventListener('loaded', () => {
      if (this.data.target.length > 0) {
        this.targetEl = this.el.querySelector(`#${this.data.target}`);
      }
      this.updateDraggable();
    });
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
    if (this.targetEl) {
      this.targetEl.setAttribute('click-drag', true);
      this.targetEl.addEventListener('dragend', this.dropHandler.bind(this));
    }
  },
  setNotDraggable() {
    if (this.targetEl) {
      this.targetEl.removeAttribute('click-drag');
      this.targetEl.removeEventListener('dragend', this.dropHandler.bind(this));
    }
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

      const id = this.el.getAttribute('uuid');
      if (id && editorMode === MODE_COMPONENT_PLACING) {
        const {
          x: field_x,
          y: field_y,
          z: field_z
        } = this.targetEl.getAttribute('position');
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
