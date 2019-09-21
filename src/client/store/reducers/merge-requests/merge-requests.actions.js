/*
* Actions
* */

import mergeRequestsConstants from './merge-requests.constants';

const {
  MERGE_REQUESTS_FETCH,
  MERGE_REQUESTS_FETCH_SUCCESS,
  MERGE_REQUESTS_FETCH_ERROR,
} = mergeRequestsConstants;

export const fetchMergeRequests = payload => ({
  type: MERGE_REQUESTS_FETCH,
  payload,
});

export const fetchMergeRequestsSuccess = payload => ({
  type: MERGE_REQUESTS_FETCH_SUCCESS,
  payload,
});

export const fetchMergeRequestsError = payload => ({
  type: MERGE_REQUESTS_FETCH_ERROR,
  payload,
});
