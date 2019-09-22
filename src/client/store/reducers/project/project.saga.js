import {
  call,
  takeLatest,
  all,
  put,
} from 'redux-saga/effects';
import { fetchProjectById } from '../projects/projects.saga';
import { fetchMergeRequestsByProjectId } from '../merge-requests/merge-requests.saga';

import { fetchProjectDataSuccess } from './project.actions';
import projectDataConstants from './project.constants';

const {
  PROJECT_DATA_FETCH,
} = projectDataConstants;

export function* fetchProjectData(action) {
  const projectId = action.payload;

  yield all([
    call(fetchProjectById, projectId),
    call(fetchMergeRequestsByProjectId, projectId),
  ]);

  yield put(fetchProjectDataSuccess(projectId));
}

export function* watchFetchProjectData() {
  yield takeLatest(PROJECT_DATA_FETCH, fetchProjectData);
}
