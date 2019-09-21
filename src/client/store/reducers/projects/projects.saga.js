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
    const { projectsApi } = services;

    const response = yield call(projectsApi.fetchProjects);

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

export function* fetchProject(action) {
  try {
    const id = action.payload;
    const services = yield getContext('services');
    const { projectsApi } = services;
    const response = yield call(projectsApi.fetchProject, id);
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
