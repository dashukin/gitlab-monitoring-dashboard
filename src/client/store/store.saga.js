/*
* Root saga
* */
import { fork, spawn, all } from 'redux-saga/effects';
import map from 'lodash/fp/map';
import { initI18n, watchI18n } from 'src/client/store/reducers/i18n/i18n.saga';
import { watchExample } from 'src/client/store/reducers/__example/example.saga';
import { watchFetchProjectData } from 'src/client/store/reducers/project/project.saga';
import { watchProjects } from 'src/client/store/reducers/projects/projects.saga';
import { watchMergeRequests } from 'src/client/store/reducers/merge-requests/merge-requests.saga';

export const startSagas = [
  initI18n,
];

export const watchSagas = [
  watchI18n,
  watchExample,
  watchFetchProjectData,
  watchProjects,
  watchMergeRequests,
];

export function* watchSaga() {
  yield all(map(spawn, watchSagas));
}

export function* rootSaga() {
  yield spawn(watchSaga);
  yield all(map(fork, startSagas));
}
