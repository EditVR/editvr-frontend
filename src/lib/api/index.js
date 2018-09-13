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
  experiencesEdit
} from './experiences';
import { sceneCreate, sceneEdit, sceneAttachComponent } from './scene';
import { fileImageCreate, fileVideoCreate, fileCreate } from './file';
import { componentEdit, componentCreate } from './component';

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
  sceneCreate,
  sceneEdit,
  sceneAttachComponent,
  componentCreate,
  componentEdit,
  experiencesEdit,
  openExperienceFetchForUser,
  openExperienceAttachScene,
  fileImageCreate,
  fileVideoCreate,
  fileCreate
};
