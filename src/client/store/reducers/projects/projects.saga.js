/*
* Saga
* */

import {
  takeLatest, all, call, put, spawn, getContext,
} from 'redux-saga/effects';
import map from 'lodash/fp/map';
import { addToDB } from 'src/client/store/reducers/db/db.actions';
import projectsConstants from './projects.constants';
import {
  fetchProjectsSuccess,
  fetchProjectsError,
} from './projects.actions';


const {
  PROJECT_FETCH,
  PROJECTS_FETCH,
} = projectsConstants;

export function* fetchProjects() {
  try {
    const services = yield getContext('services');
    const { gitlabApi } = services;

    const response = yield call(gitlabApi.fetchProjects);

    const projectIds = response.result;
    const projectEntities = response.entities.project;

    yield put(addToDB({
      key: 'projects',
      data: projectEntities,
    }));

    yield put(fetchProjectsSuccess(projectIds));
  } catch (error) {
    console.error(error);
    yield put(fetchProjectsError({ error: error.message }));
  }
}

export function* watchFetchExampleData() {
  yield takeLatest(PROJECTS_FETCH, fetchProjects);
}

export function* fetchProjectById(projectId) {
  try {
    const services = yield getContext('services');
    const { gitlabApi } = services;
    const response = yield call(gitlabApi.fetchProject, projectId);
    const { data } = response;
    const projectEntity = data.entities.project;

    yield put(addToDB({
      key: 'projects',
      data: projectEntity,
    }));
  } catch (e) {
    console.error(e);
  }
}

export function* fetchProject(action) {
  const projectId = action.payload;
  yield call(fetchProjectById, projectId);
}

export function* watchFetchProject() {
  yield takeLatest(PROJECT_FETCH, fetchProject);
}

export const watchers = [
  watchFetchProject,
  watchFetchExampleData,
];

export function* watchProjects() {
  yield all(map(spawn, watchers));
}
