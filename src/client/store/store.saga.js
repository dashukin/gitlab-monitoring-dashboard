/*
* Root saga
* */
import { fork, spawn, all } from 'redux-saga/effects';
import map from 'lodash/fp/map';
import { initI18n, watchI18n } from 'src/client/store/reducers/i18n/i18n.saga';
import { watchFetchProjectData } from 'src/client/store/reducers/project/project.saga';
import { watchProjects } from 'src/client/store/reducers/projects/projects.saga';
import { watchMergeRequests } from 'src/client/store/reducers/merge-requests/merge-requests.saga';
import { watchJiraIssues } from 'src/client/store/reducers/jira-issues/jira-issues.saga';
import { watchGitlabMrAwardEmoji } from 'src/client/store/reducers/gitlab-award-emoji/gitlab-award-emoji.saga';

export const startSagas = [
  initI18n,
];

export const watchSagas = [
  watchI18n,
  watchFetchProjectData,
  watchProjects,
  watchMergeRequests,
  watchJiraIssues,
  watchGitlabMrAwardEmoji,
];

export function* watchSaga() {
  yield all(map(spawn, watchSagas));
}

export function* rootSaga() {
  yield spawn(watchSaga);
  yield all(map(fork, startSagas));
}
