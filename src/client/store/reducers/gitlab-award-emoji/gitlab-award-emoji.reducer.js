/*
* Reducer
* */

import get from 'lodash/get';
import gitlabAwardEmojiConstants from './gitlab-award-emoji.constants';

const {
  GITALB_MR_AWARD_EMOJI_FETCH_SUCCESS,
  GITALB_MR_AWARD_EMOJI_FETCH_ERROR,
} = gitlabAwardEmojiConstants;

const initialState = {
  ids: [],
  error: undefined,
};

const gitlabAwardEmoji = (state = initialState, action) => {
  switch (action.type) {
    case GITALB_MR_AWARD_EMOJI_FETCH_SUCCESS: {
      const ids = get(action, 'payload', []);

      return { ...state, ids };
    }

    case GITALB_MR_AWARD_EMOJI_FETCH_ERROR: {
      const error = get(action, 'payload');

      return { ...state, error };
    }

    default:
      return state;
  }
};

export default gitlabAwardEmoji;
