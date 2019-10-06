/*
* Saga
* */

import {
  takeLatest, all, call, put, fork, getContext,
} from 'redux-saga/effects';
import map from 'lodash/fp/map';
import gitlabAwardEmojiConstants from './gitlab-award-emoji.constants';
import {
  fetchGitlabMrAwardEmojiSuccess,
  fetchGitlabMrAwardEmojiError,
} from './gitlab-award-emoji.actions';
import { addToDB } from '../db/db.actions';

const {
  GITALB_MR_AWARD_EMOJI_FETCH,
} = gitlabAwardEmojiConstants;

/**
 *
 * @param {Number} projectId
 * @param {Number|Number[]} mergeRequestIid
 * @return {IterableIterator<*>}
 */
export function* fetchGitlabMrAwardEmojiData({ projectId, mergeRequestIid }) {
  try {
    const services = yield getContext('services');
    const { gitlabApi } = services;
    const { data } = yield call(gitlabApi.fetchProjectMergeRequestAwardEmoji, {
      projectId,
      mergeRequestIid,
    });

    const { result: awardEmojiIds, entities } = data;
    const { awardEmoji: awardEmojiEntities } = entities;

    yield put(fetchGitlabMrAwardEmojiSuccess(awardEmojiIds));
    yield put(addToDB({
      key: 'gitlabAwardEmoji',
      data: awardEmojiEntities,
    }));
  } catch (error) {
    yield put(fetchGitlabMrAwardEmojiError({ error }));
  }
}

export function* fetchGitlabMrAwardEmoji(action) {
  const { projectId, mergeRequestIid } = action.payload;

  yield fetchGitlabMrAwardEmojiData({
    projectId,
    mergeRequestIid,
  });
}

export function* watchFetchGitlabMrAwardEmoji() {
  yield takeLatest(GITALB_MR_AWARD_EMOJI_FETCH, fetchGitlabMrAwardEmoji);
}

export const watchers = [
  watchFetchGitlabMrAwardEmoji,
];

export function* watchGitlabMrAwardEmoji() {
  yield all(map(fork, watchers));
}
