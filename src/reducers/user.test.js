/**
 * @file user.test.js
 * Contains tests for user.js.
 */

import reducer from './user';
import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR
} from '../constants';

describe('reducers->user', () => {
  it('Should return the initial state by default', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it(`Should handle ${USER_LOG_IN}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${USER_LOG_IN}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${USER_LOG_IN}_FAIL`, () => {
    const error = 'Error: failed to log user in.';
    expect(
      reducer(undefined, {
        type: `${USER_LOG_IN}_FAIL`,
        loading: false,
        error,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${USER_LOG_IN}_SUCCESS`, () => {
    const payload = {
      // This needs to be a valid access token, as the reducer parses the user
      // uid from this string.
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3YWYyODU0NDU5ZGU1NTRjNjEzOTkwY2VjM2I4MDM5NjZjZTMyNjg2MjFhMDMwYmIyNzZmOThkNjY1OWYzMzAxZWE2ODA1NzBkOGQ4ZDU4In0.eyJhdWQiOiIxNmIwZWQ4Ny03MTE2LTQwZDItOWIyNi0zNTRhZjNiMmRlYjMiLCJqdGkiOiIzN2FmMjg1NDQ1OWRlNTU0YzYxMzk5MGNlYzNiODAzOTY2Y2UzMjY4NjIxYTAzMGJiMjc2Zjk4ZDY2NTlmMzMwMWVhNjgwNTcwZDhkOGQ1OCIsImlhdCI6MTUyNzY5ODMwMCwibmJmIjoxNTI3Njk4MzAwLCJleHAiOjE1Mjc3MjgzMDAsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCIsImVkaXRvciJdfQ.WfaJ34VLxwS2tHaivfj8zBdf3ToV5LUWMPrjhoYVvkB9vwboGcQKk0pFYk8VSVlyDj5BiwzUQy5t5DXkEFlTv4qcRUoXvmcYbUTbVYQNSogLwiICCa7eEDNyFeaD7sBje2xFCvs8Osb2RTo-nx2SghY0qVziz1ZSNfApyt6ZDZwrnUexdWkV9Mr0rGy6ZUYmv3mCe4wQQIMDGFEuqrikZ00Ov7GkN1HSvNDzgN8SEeQe6trQ_7EgHYXnNywEyCzwe0zdYGy7b7cBhlul453GCW3jp-Y5ZLwY_SEjW8tRSpjCupbQKAWu3Zw92xkpgI7Nc4AkyuQqVepwp0kWzYk0ew',
      expiresIn: 3000,
      refreshToken: 'test',
      created: 1527698343501,
      csrfToken: 'test',
      role: USER_ROLE_EDITOR
    };
    expect(
      reducer(undefined, {
        type: `${USER_LOG_IN}_SUCCESS`,
        loading: false,
        error: null,
        payload
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${USER_LOG_OUT}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${USER_LOG_OUT}_SUCCESS`
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${USER_SET_ROLE}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${USER_SET_ROLE}_SUCCESS`,
        payload: {
          role: USER_ROLE_EDITOR
        }
      })
    ).toMatchSnapshot();
  });
});
