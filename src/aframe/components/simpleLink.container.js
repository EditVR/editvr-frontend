/**
 * @file simpleLink.container.js
 * AFrame component responsible for connecting link components to redux.
 */

/* globals AFRAME */
import { equals } from 'ramda';

import { MODE_COMPONENT_PLACING } from '../../constants';
import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';
import navigateIcon from '../../assets/icons/navigate.jpg';

/**
 * AFrame component that spawns dialog components whenever it's initialized,
 * or whenever the current scene is changed.
 */
const simpleLinkContainer = {
  multiple: true,
  uuid: null,
  init() {
    this.uuid = this.el.getAttribute('uuid');
    this.render();
  },
  didReceiveProps() {
    this.render();
  },
  didReceiveRoute() {
    this.render();
  },
  shouldComponentUpdate(oldProps, newProps) {
    const {
      router: {
        match: {
          params: { sceneSlug }
        }
      }
    } = this;

    const {
      experience: { scenes: oldScenes }
    } = oldProps;

    const {
      experience: { scenes: newScenes }
    } = newProps;

    const oldComponent = oldScenes[sceneSlug].components[this.uuid] || null;
    const newComponent = newScenes[sceneSlug].components[this.uuid] || null;
    return !equals(oldComponent, newComponent);
  },
  render() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.scenes) {
      return;
    }

    const {
      props: {
        experience: { scenes, field_experience_path },
      },
      router: {
        match: {
          params: { sceneSlug, editorMode }
        }
      }
    } = this;

    const component = scenes[sceneSlug].components[this.uuid] || null;
    if (component && component.field_scene_link) {
      const {
        field_x: x,
        field_y: y,
        field_z: z,
        title,
        field_scene_link: { field_slug },
      } = component;

      const simpleLink = {
        title,
        href: `/experience/vreditor/${field_experience_path}/${field_slug}`,
        image: navigateIcon,
        active: true
      };

      if (editorMode === MODE_COMPONENT_PLACING) {
        simpleLink.active = false;
      }

      this.el.setAttribute('position', { x, y, z });
      this.el.setAttribute('simple-link', simpleLink);
    }
  }
};

AFRAME.registerComponent(
  'simple-link-container',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(
      simpleLinkContainer,
      '/experience/vreditor/:experienceSlug/:sceneSlug/:editorMode?'
    )
  )
);
