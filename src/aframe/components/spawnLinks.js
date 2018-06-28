/**
 * @file spawnLinks.js
 * AFrame component responsible for spawning links.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

const spawnLinks = {
  multiple: false,
  init: function init() {
    this.spawn();
  },
  shouldComponentUpdateRouting: function shouldComponentUpdateRouting(
    oldProps,
    newProps
  ) {
    if (oldProps.history.location !== newProps.history.location) {
      return true;
    }

    return false;
  },
  didReceiveProps: function didReceiveProps() {
    this.spawn();
  },
  spawn: function spawn() {
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

    const scene = experience.field_scenes.filter(
      s => s.field_slug === sceneSlug
    )[0];
    if (scene) {
      scene.field_components
        .filter(c => c.field_component_type === 'link')
        .forEach(component => {
          const e = document.createElement('a-link');
          e.setAttribute('id', component.id);
          e.setAttribute('nav-link', '');
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
