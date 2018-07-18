/**
 * @file spawnDialogs.js
 * AFrame component responsible for spawning dialogs.
 */

/* globals AFRAME */

import openIconImage from '../../assets/icons/info.jpg';
import closeIconImage from '../../assets/icons/close.jpg';

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';
import parseSceneFromExperience from '../../lib/parseSceneFromExperience';

/**
 * AFrame component that spawns dialog components whenever it's initialized,
 * or whenever the route has been changed.
 */
const spawnDialogs = {
  multiple: false,
  init() {
    this.spawn();
  },
  shouldComponentUpdateRouting(oldProps, newProps) {
    if (oldProps.history.location !== newProps.history.location) {
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
  spawn() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.field_scenes) {
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

    const scene = parseSceneFromExperience(experience, sceneSlug);
    if (scene) {
      scene.field_components
        .filter(c => c.field_component_type === 'panelimage')
        .forEach(component => {
          const {
            field_x: x,
            field_y: y,
            field_z: z,
            title,
            field_body: body
          } = component;

          const e = document.createElement('a-entity');
          e.setAttribute('id', component.id);
          e.setAttribute('look-at', '#camera');
          e.setAttribute('is-editable', true);
          e.setAttribute('position', { x, y, z });
          e.setAttribute('dialog-popup', {
            title,
            body,
            openIconImage,
            closeIconImage
          });
          this.el.appendChild(e);
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
