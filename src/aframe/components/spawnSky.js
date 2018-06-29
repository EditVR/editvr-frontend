/**
 * @file spawnSky.js
 * AFrame component responsible for sky entities.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that sets the sky src attribute based on the current route.
 */
const spawnSky = {
  multiple: false,
  init: function init() {
    this.setSkyUrl();
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
  didReceiveRoute: function didReceiveRoute() {
    this.setSkyUrl();
  },
  didReceiveProps: function didReceiveProps() {
    this.setSkyUrl();
  },
  setSkyUrl: function setSkyUrl() {
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

    // If a scene exists for the given slug, render it's video or photo sphere.
    const scene = experience.field_scenes.filter(
      s => s.field_slug === sceneSlug
    )[0];
    if (scene) {
      const {
        field_sky_rotation_x: x,
        field_sky_rotation_y: y,
        field_sky_rotation_z: z
      } = scene;
      const sky = scene.field_videosphere || scene.field_photosphere;
      const url = new URL(sky.links.self);
      this.el.setAttribute('src', `${url.origin}${sky.url}`);
      this.el.setAttribute('rotation', { x: x || 0, y: y || 0, z: z || 0 });
    }
  }
};

AFRAME.registerComponent(
  'spawn-sky',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(spawnSky, '/experience/vreditor/:experienceSlug/:sceneSlug')
  )
);
