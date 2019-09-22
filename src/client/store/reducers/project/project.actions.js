/*
* Actions
* */

import projectConstants from './project.constants';

const {
  PROJECT_DATA_FETCH,
  PROJECT_DATA_FETCH_SUCCESS,
  PROJECT_DATA_FETCH_ERROR,
} = projectConstants;

export const fetchProjectData = payload => ({
  type: PROJECT_DATA_FETCH,
  payload,
});

export const fetchProjectDataSuccess = payload => ({
  type: PROJECT_DATA_FETCH_SUCCESS,
  payload,
});

export const fetchProjectDataError = error => ({
  type: PROJECT_DATA_FETCH_ERROR,
  payload: error,
});
