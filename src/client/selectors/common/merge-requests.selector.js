import get from 'lodash/get';

const defaultMergeRequests = Object.freeze({});

export const getMergeRequestsEntities = state => get(state, 'db.mergeRequests', defaultMergeRequests);
