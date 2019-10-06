import {
  call,
  takeLatest,
  all,
  put,
  select,
} from 'redux-saga/effects';
import {
  getCurrentProjectMergeRequestsIssues,
  getCurrentProjectMergeRequestsIids,
} from 'src/client/selectors/composed/project/project.selector';
import { fetchProjectById } from '../projects/projects.saga';
import { fetchMergeRequestsByProjectId } from '../merge-requests/merge-requests.saga';
import { fetchGitlabMrAwardEmojiData } from '../gitlab-award-emoji/gitlab-award-emoji.saga';

import { fetchProjectDataSuccess } from './project.actions';
import projectDataConstants from './project.constants';
import { fetchJiraIssuesByIds } from '../jira-issues/jira-issues.saga';

const {
  PROJECT_DATA_FETCH,
} = projectDataConstants;

export function* fetchProjectData(action) {
  const projectId = action.payload;

  yield all([
    call(fetchProjectById, projectId),
    call(fetchMergeRequestsByProjectId, projectId),
  ]);

  const mergeRequestsIssuesIds = yield select(getCurrentProjectMergeRequestsIssues);
  const mergeRequestsIids = yield select(getCurrentProjectMergeRequestsIids);

  yield call(fetchGitlabMrAwardEmojiData, {
    projectId,
    mergeRequestIid: mergeRequestsIids,
  });
  yield call(fetchJiraIssuesByIds, mergeRequestsIssuesIds);

  yield put(fetchProjectDataSuccess(projectId));
}

export function* watchFetchProjectData() {
  yield takeLatest(PROJECT_DATA_FETCH, fetchProjectData);
}
