/*
* Saga
* */

import {
  takeLatest, all, call, put, fork, getContext,
} from 'redux-saga/effects';
import map from 'lodash/fp/map';
import jiraIssuesConstants from './jira-issues.constants';
import {
  fetchJiraIssuesSuccess,
  fetchJiraIssuesError,
} from './jira-issues.actions';
import { addToDB } from '../db/db.actions';

const {
  JIRA_ISSUES_FETCH,
} = jiraIssuesConstants;
export function* fetchJiraIssuesByIds(ids) {
  try {
    const services = yield getContext('services');
    const { jiraApi } = services;
    const response = yield call(jiraApi.fetchIssues, ids);

    const {
      result: jiraIssuesIds,
      entities,
    } = response.data;

    const { issue: jiraIssues } = entities;

    yield put(addToDB({
      key: 'jiraIssues',
      data: jiraIssues,
    }));

    yield put(fetchJiraIssuesSuccess(jiraIssuesIds));
  } catch (error) {
    yield put(fetchJiraIssuesError(error));
  }
}

export function* fetchJiraIssues(action) {
  const ids = action.payload;
  yield call(fetchJiraIssuesByIds, ids);
}

export function* watchFetchJiraIssuesData() {
  yield takeLatest(JIRA_ISSUES_FETCH, fetchJiraIssues);
}

export const watchers = [
  watchFetchJiraIssuesData,
];

export function* watchJiraIssues() {
  yield all(map(fork, watchers));
}
