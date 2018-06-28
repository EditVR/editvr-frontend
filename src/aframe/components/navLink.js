/**
 * @file link.js
 * Link component.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that constructs a link entity, and destroys it when the
 * route has changed.
 */
const navLink = {
  multiple: true,
  init: function init() {
    this.render();
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
    this.render();
  },
  didReceiveRoute: function didReceiveRoute() {
    this.destroy();
  },
  destroy: function destroy() {
    this.el.parentNode.removeChild(this.el);
  },
  render: function render() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.field_scenes) {
      return;
    }

    const {
      props: { experience },
      router: {
        match: {
          params: { sceneSlug, experienceSlug }
        }
      }
    } = this;

    const scene = experience.field_scenes.filter(
      s => s.field_slug === sceneSlug
    )[0];
    if (scene) {
      const id = this.el.getAttribute('id');
      const component = scene.field_components.filter(c => c.id === id)[0];
      if (component) {
        const {
          field_x: x,
          field_y: y,
          field_z: z,
          title,
          field_scene_link: { field_slug: to }
        } = component;
        this.el.setAttribute('look-at', '[camera]');
        this.el.setAttribute('position', { x, y, z });
        this.el.setAttribute('title', title);
        this.el.setAttribute('color', 'white');
        this.el.setAttribute(
          'href',
          `/experience/vreditor/${experienceSlug}/${to}`
        );
      }
    }
  }
};

AFRAME.registerComponent(
  'nav-link',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(connectRouter(navLink, '/experience/vreditor/:experienceSlug/:sceneSlug'))
);
