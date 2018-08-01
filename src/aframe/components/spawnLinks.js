/**
 * @file spawnLinks.js
 * AFrame component responsible for spawning links.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that spawns link components whenever it's initialized,
 * or whenever the route has been changed.
 */
const spawnLinks = {
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

    const scene = experience.scenes[sceneSlug];
    if (scene) {
      scene.field_components
        .filter(c => c.field_component_type === 'link')
        .forEach(component => {
          const e = document.createElement('a-link');
          e.setAttribute('id', component.id);
          e.setAttribute('is-editable', true);
          this.el.appendChild(e);
        });
    }
  }
};

AFRAME.registerComponent(
  'spawn-links',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(spawnLinks, '/experience/vreditor/:experienceSlug/:sceneSlug')
  )
);
