import { createSelector } from 'reselect';
import getOr from 'lodash/fp/getOr';
import map from 'lodash/map';
import pick from 'lodash/pick';

export const getAwardEmojiIds = getOr(Object.freeze([]), 'gitlabAwardEmoji.ids');
export const getAwardEmojiEntities = getOr(Object.freeze({}), 'db.gitlabAwardEmoji');

export const getAwardEmojis = createSelector(
  [getAwardEmojiIds, getAwardEmojiEntities],
  (ids, entities) => {
    const awardEmojiList = map(pick(entities, ids), data => data);

    return awardEmojiList;
  },
);

export const getAwardEmojiThumbsUp = createSelector(
  [getAwardEmojis],
  (awardEmojis) => {
    const thumbsUp = awardEmojis.filter(getAwardEmoji => getAwardEmoji.name === 'thumbsup');

    return thumbsUp;
  },
);
