/**
 * @file clickDrag.js
 * Exports an AFrame component that can make entities drag/drop-able.
 */

/* globals AFRAME */

const clickDrag = {
  multiple: true,
  sceneEl: null,
  didMount() {
    if (this.sceneEl.hasLoaded) {
      this.registerMouseHandlers();
    }
    else {
      this.sceneEl.addEventListener('loaded', this.registerMouseHandlers.bind(this));
    }
  },

  didUnmount() {

  },

  onDragend({ detail: { nextPosition } }) {

  },

  onMouseUp({ clientX, clientY }) {
    console.log(clientX, clientY);
  },

  onMouseDown({ clientX, clientY }) {
    console.log(clientX, clientY);
  },

  onTouchStart({ changedTouches: [touchInfo] }) {
    this.onMouseDown(touchInfo);
  },

  onTouchEnd({ changedTouches: [touchInfo] }) {
    this.onMouseUp(touchInfo);
  },

  calculateVelocity() {

  },

  registerMouseHandlers() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init() {
    this.sceneEl = document.querySelector('a-scene');
    this.didMount();
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove() {
    this.didUnmount();
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause() {
    this.didUnmount();
  },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play() {
    this.didMount();
  }
};

AFRAME.registerComponent('click-drag', clickDrag);
