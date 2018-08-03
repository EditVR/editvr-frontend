/**
 * @file index.js
 * Exports all API-communication methods.
 */

import axiosInstance from './axiosInstance';
import { getAccessToken, getCsrfToken } from './user';
import {
  experiencesFetchForUser,
  experiencesCreate,
  experiencesEdit
} from './experiences';
import { sceneCreate, sceneEdit } from './scene';
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
  experiencesFetchForUser,
  experiencesCreate,
  sceneCreate,
  sceneEdit,
  componentCreate,
  componentEdit,
  experiencesEdit,
  openExperienceFetchForUser,
  openExperienceAttachScene,
  fileImageCreate,
  fileVideoCreate,
  fileCreate
};
