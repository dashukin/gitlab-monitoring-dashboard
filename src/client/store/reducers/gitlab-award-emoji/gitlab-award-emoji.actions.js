/*
* Actions
* */

import gitlabAwardEmojiConstants from './gitlab-award-emoji.constants';

const {
  GITALB_MR_AWARD_EMOJI_FETCH,
  GITALB_MR_AWARD_EMOJI_FETCH_SUCCESS,
  GITALB_MR_AWARD_EMOJI_FETCH_ERROR,
} = gitlabAwardEmojiConstants;

export const fetchGitlabMrAwardEmoji = () => ({
  type: GITALB_MR_AWARD_EMOJI_FETCH,
});

export const fetchGitlabMrAwardEmojiSuccess = payload => ({
  type: GITALB_MR_AWARD_EMOJI_FETCH_SUCCESS,
  payload,
});

export const fetchGitlabMrAwardEmojiError = error => ({
  type: GITALB_MR_AWARD_EMOJI_FETCH_ERROR,
  payload: error,
});
