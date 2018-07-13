/**
 * @file spawnSky.js
 * AFrame component responsible for sky entities.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';
import parseSceneFromExperience from '../../lib/parseSceneFromExperience';
import parseSkyFromScene from '../../lib/parseSkyFromScene';

/**
 * AFrame component that sets the sky src attribute based on the current route.
 */
const spawnSky = {
  multiple: false,
  init() {
    this.setSkyUrl();
  },
  shouldComponentUpdateRouting(oldProps, newProps) {
    if (oldProps.history.location !== newProps.history.location) {
      return true;
    }

    return false;
  },
  didReceiveRoute() {
    this.setSkyUrl();
  },
  didReceiveProps() {
    this.setSkyUrl();
  },
  setSkyUrl() {
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
      const {
        field_sky_rotation_x: x,
        field_sky_rotation_y: y,
        field_sky_rotation_z: z
      } = scene;
      const sky = parseSkyFromScene(scene);
      this.el.setAttribute('src', sky.url);
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
