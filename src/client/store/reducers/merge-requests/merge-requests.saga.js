/*
* Saga
* */

import { normalizeMergeRequests } from 'src/common/services/normalize';
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

export function* fetchMergeRequests(action) {
  try {
    const projectId = action.payload;
    const services = yield getContext('services');
    const { gitlabApi } = services;

    const mrResponse = yield call(gitlabApi.fetchMergeRequests, projectId);
    const mrDataNormalized = normalizeMergeRequests(mrResponse);
    const mergeRequestsIds = mrDataNormalized.result;
    const mergeRequestsEntities = mrDataNormalized.entities.mergeRequest;

    yield put(addToDB({
      key: 'mergeRequests',
      data: mergeRequestsEntities,
    }));

    yield put(fetchMergeRequestsSuccess(mergeRequestsIds));
  } catch (error) {
    yield put(fetchMergeRequestsError({ error: error.message }));
  }
}

export function* watchFetchExampleData() {
  yield takeLatest(MERGE_REQUESTS_FETCH, fetchMergeRequests);
}

export const watchers = [
  watchFetchExampleData,
];

export function* watchMergeRequests() {
  yield all(map(spawn, watchers));
}
