/**
 * @file spawnComponents.js
 * AFrame component responsible for experience components.
 */

/* globals AFRAME */

import { forEachObjIndexed } from 'ramda';

import { COMPONENT_TYPE_DIALOG, COMPONENT_TYPE_LINK } from '../../constants';
import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that spawns experience components whenever it's initialized,
 * or whenever the current scene is changed.
 */
const spawnComponents = {
  multiple: false,
  components: [],
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

    const {
      router: {
        match: {
          params: { sceneSlug }
        }
      }
    } = this;

    // If a new component has been added to the scene, update.
    if (
      Object.keys(oldProps.experience.scenes[sceneSlug].components).length !==
      Object.keys(newProps.experience.scenes[sceneSlug].components).length
    ) {
      return true;
    }

    return false;
  },
  didReceiveProps() {
    this.deSpawn();
    this.spawn();
  },
  didReceiveRoute() {
    this.deSpawn();
    this.spawn();
  },
  deSpawn() {
    this.components.forEach(component => {
      this.el.removeChild(component);
    });
    this.components = [];
  },
  spawn() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.scenes) {
      return;
    }

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
      forEachObjIndexed(component => {
        const e = document.createElement('a-entity');
        e.setAttribute('id', `component--${component.id}`);
        e.setAttribute('uuid', component.id);
        e.setAttribute('look-at', '#camera');
        e.setAttribute('is-editable', true);
        e.setAttribute('is-draggable', true);

        switch (component.field_component_type) {
          case COMPONENT_TYPE_DIALOG:
            e.setAttribute('dialog-popup-container', true);
            break;
          case COMPONENT_TYPE_LINK:
            e.setAttribute('simple-link-container', true);
            break;
          default:
            break;
        }

        this.el.appendChild(e);
        this.components.push(e);
      }, scene.components);
    }
  }
};

AFRAME.registerComponent(
  'spawn-components',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(
      spawnComponents,
      '/experience/:viewer/:experienceSlug/:sceneSlug'
    )
  )
);
