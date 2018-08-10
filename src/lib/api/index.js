/**
 * @file index.js
 * Exports all API-communication methods.
 */

import axiosInstance from './axiosInstance';
import { getAccessToken, getCsrfToken, registerUserAccount } from './user';
import {
  experiencesFetchForUser,
  experiencesCreate,
  experiencesEdit
} from './experiences';
import { sceneCreate, sceneEdit } from './scene';
import { fileImageCreate, fileVideoCreate, fileCreate } from './file';
import { componentEdit } from './component';

import {
  openExperienceFetchForUser,
  openExperienceAttachScene
} from './openExperience';

export {
  axiosInstance,
  getAccessToken,
  getCsrfToken,
  registerUserAccount,
  experiencesFetchForUser,
  experiencesCreate,
  sceneCreate,
  sceneEdit,
  componentEdit,
  experiencesEdit,
  openExperienceFetchForUser,
  openExperienceAttachScene,
  fileImageCreate,
  fileVideoCreate,
  fileCreate
};
