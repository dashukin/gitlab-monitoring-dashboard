/*
* Saga
* */

import {
  takeLatest, all, call, put, spawn, getContext,
} from 'redux-saga/effects';
import map from 'lodash/fp/map';
import { addToDB } from 'src/client/store/reducers/db/db.actions';
import mergeRequestsConstants from './merge-requests.constants';
import {
  fetchMergeRequestsSuccess,
  fetchMergeRequestsError,
} from './merge-requests.actions';

const {
  MERGE_REQUESTS_FETCH,
} = mergeRequestsConstants;

export function* fetchMergeRequestsByProjectId(projectId) {
  try {
    const services = yield getContext('services');
    const { projectsApi } = services;

    const { data } = yield call(projectsApi.fetchMergeRequests, projectId);
    const mergeRequestsIds = data.result;
    const mergeRequestsEntities = data.entities.mergeRequest;

    yield put(addToDB({
      key: 'mergeRequests',
      data: mergeRequestsEntities,
    }));

    yield put(fetchMergeRequestsSuccess(mergeRequestsIds));
  } catch (error) {
    console.error(error);
    yield put(fetchMergeRequestsError({ error: error.message }));
  }
}

export function* fetchMergeRequests(action) {
  const projectId = action.payload;

  yield call(fetchMergeRequestsByProjectId, projectId);
}


export function* watchFetchMergeRequests() {
  yield takeLatest(MERGE_REQUESTS_FETCH, fetchMergeRequests);
}

export const watchers = [
  watchFetchMergeRequests,
];

export function* watchMergeRequests() {
  yield all(map(spawn, watchers));
}
