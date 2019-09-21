/*
* Actions
* */

import projectsConstants from './projects.constants';

const {
  PROJECTS_FETCH,
  PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_ERROR,
  PROJECT_FETCH,
} = projectsConstants;

export const fetchProjects = () => ({
  type: PROJECTS_FETCH,
});

export const fetchProjectsSuccess = payload => ({
  type: PROJECTS_FETCH_SUCCESS,
  payload,
});

export const fetchProjectsError = payload => ({
  type: PROJECTS_FETCH_ERROR,
  payload,
});

export const fetchProject = payload => ({
  type: PROJECT_FETCH,
  payload,
});
