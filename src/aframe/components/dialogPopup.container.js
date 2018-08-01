/**
 * @file dialogPopup.container.js
 * AFrame component responsible for connecting dialog popups to redux.
 */

/* globals AFRAME */
import { equals } from 'ramda';

import openIconImage from '../../assets/icons/info.jpg';
import closeIconImage from '../../assets/icons/close.jpg';

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that spawns dialog components whenever it's initialized,
 * or whenever the current scene is changed.
 */
const dialogPopupContainer = {
  multiple: true,
  init() {
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
      experience: { scenes: oldScenes },
    } = oldProps;

    const {
      experience: { scenes: newScenes },
    } = newProps;

    const oldComponent = oldScenes[sceneSlug].components[this.el.getAttribute('id')] || null;
    const newComponent = newScenes[sceneSlug].components[this.el.getAttribute('id')] || null;
    return !equals(oldComponent, newComponent);
  },
  render() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.scenes) {
      return;
    }

    const {
      props: { experience: { scenes } },
      router: {
        match: {
          params: { sceneSlug }
        }
      }
    } = this;

    const component = scenes[sceneSlug].components[this.el.getAttribute('id')] || null;
    if (component) {
      const { field_x: x, field_y: y, field_z: z, title, field_body: body } = component;
      const dialogPopup = {
        title,
        titleColor: 'white',
        titleFont: 'roboto',
        body,
        bodyColor: 'white',
        bodyFont: 'roboto',
        dialogBoxColor: '#127218',
        openIconImage,
        closeIconImage,
      };

      if (component.field_image) {
        const {
          field_image: {
            url: path,
            links: { self }
          }
        } = component;
        const url = new URL(self);
        dialogPopup.image = `${url.origin}${path}`;
      }

      this.el.setAttribute('position', { x, y, z });
      this.el.setAttribute('dialog-popup', dialogPopup);
    }
  }
}

AFRAME.registerComponent(
  'dialog-popup-container',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(
    connectRouter(
      dialogPopupContainer,
      '/experience/vreditor/:experienceSlug/:sceneSlug'
    )
  )
);
