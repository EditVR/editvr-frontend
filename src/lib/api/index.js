/**
 * @file index.js
 * Exports all API-communication methods.
 */

import axiosInstance from './axiosInstance';
import {
  getAccessToken,
  getCsrfToken,
  registerUserAccount,
  resetUserPassword
} from './user';
import {
  experiencesFetchForUser,
  experiencesCreate,
  experiencesEdit,
  experiencesRemove
} from './experiences';
import { sceneCreate, sceneEdit, sceneAttachComponent } from './scene';
import { fileImageCreate, fileVideoCreate, fileCreate } from './file';
import { componentEdit, componentCreate, componentRemove } from './component';

import {
  openExperienceFetchForUser,
  openExperienceAttachScene
} from './openExperience';

export {
  axiosInstance,
  getAccessToken,
  getCsrfToken,
  registerUserAccount,
  resetUserPassword,
  experiencesFetchForUser,
  experiencesCreate,
  experiencesRemove,
  sceneCreate,
  sceneEdit,
  sceneAttachComponent,
  componentCreate,
  componentEdit,
  componentRemove,
  experiencesEdit,
  openExperienceFetchForUser,
  openExperienceAttachScene,
  fileImageCreate,
  fileVideoCreate,
  fileCreate
};
