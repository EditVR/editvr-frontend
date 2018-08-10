/**
 * @file spawnDialogs.js
 * AFrame component responsible for spawning dialogs.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that spawns dialog components whenever it's initialized,
 * or whenever the current scene is changed.
 */
const spawnDialogs = {
  multiple: false,
  dialogs: [],
  init() {
    this.spawn();
  },
  remove() {
    this.deSpawn();
  },
  shouldComponentUpdateRouting(oldProps, newProps) {
    const {
      match: {
        params: { sceneSlug: oldSceneSlug }
      }
    } = oldProps;
    const {
      match: {
        params: { sceneSlug }
      }
    } = newProps;
    if (oldSceneSlug !== sceneSlug) {
      return true;
    }

    return false;
  },
  shouldComponentUpdate(oldProps, newProps) {
    // If scenes objects are loaded in, update.
    if (!oldProps.experience.scenes && newProps.experience.scenes) {
      return true;
    }

    return false;
  },
  didReceiveProps() {
    this.spawn();
  },
  didReceiveRoute() {
    this.spawn();
  },
  deSpawn() {
    this.dialogs.forEach(dialog => {
      this.el.removeChild(dialog);
    });
    this.dialogs = [];
  },
  spawn() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.scenes) {
      return;
    }

    this.deSpawn();

    const {
      props: { experience },
      router: {
        match: {
          params: { sceneSlug }
        }
      }
    } = this;

    const scene = experience.scenes[sceneSlug] || null;
    if (scene) {
      scene.field_components
        .filter(c => c.field_component_type === 'panelimage')
        .forEach(component => {
          const e = document.createElement('a-entity');
          e.setAttribute('id', `component--${component.id}`);
          e.setAttribute('uuid', component.id);
          e.setAttribute('look-at', '#camera');
          e.setAttribute('is-editable', true);
          e.setAttribute('is-draggable', true);
          e.setAttribute('dialog-popup-container', true);
          this.el.appendChild(e);
          this.dialogs.push(e);
        });
    }
  }
};

AFRAME.registerComponent(
  'spawn-dialogs',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(
      spawnDialogs,
      '/experience/vreditor/:experienceSlug/:sceneSlug'
    )
  )
);
