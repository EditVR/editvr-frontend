/**
 * @file errors.js
 * Exports error constants.
 */

export const ERROR_API_CONNECTION_FAILED = 'Unable to connect to EditVR API';
export const ERROR_API_FORBIDDEN =
  'Access to perform this action has been denied.';
export const ERROR_API_NOT_FOUND = 'Unable to find API resource.';
export const ERROR_API_BAD_REQUEST = 'Input information is invalid.';
export const ERROR_API_UNPROCESSABLE_ENTITY =
  'Unable to operate on this item, it is malformed.';
export const ERROR_API_GENERAL = 'The server encountered an error.';
export const ERROR_API_LOGIN_FAILED =
  'Unable to log in with the provided credentials.';
export const ERROR_API_REGISTER_FAILED_EMAIL =
  'Unable to register for an account with the provided email. Make sure the email is valid and not already in use.';
export const ERROR_API_REGISTER_FAILED_USERNAME =
  'Unable to register for an account with the provided username. Make sure the username is valid and not already in use.';

export const AXIOS_ERROR_NETWORK = 'Error: Network Error';
export const AXIOS_ERROR_400 = 'Error: Request failed with status code 400';
export const AXIOS_ERROR_401 = 'Error: Request failed with status code 401';
export const AXIOS_ERROR_403 = 'Error: Request failed with status code 403';
export const AXIOS_ERROR_404 = 'Error: Request failed with status code 404';
export const AXIOS_ERROR_422 = 'Error: Request failed with status code 422';
