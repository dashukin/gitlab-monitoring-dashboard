import { schema } from 'normalizr';
import { convertRawUser } from '../helpers/schema.helpers';

/**
 * @typedef {Object} RawAwardEmoji
 *
 * @property {Number} awardable_id
 * @property {String} awardable_type
 * @property {String} created_at
 * @property {Number} id
 * @property {String} name - award emoji name, e.g. thumbsup
 * @property {String} updated_at
 * @property {RawUser} user
 *
 */

/**
 * @typedef {Object} AwardEmoji
 *
 */

export const awardEmojiSchema = new schema.Entity('awardEmoji', {}, {
  processStrategy(entity) {
    const data = {};

    data.awardableId = entity.awardable_id;
    data.awardableType = entity.awardable_type;
    data.createdAt = entity.created_at;
    data.id = entity.id;
    data.name = entity.name;
    data.updatedAt = entity.updated_at;
    data.user = convertRawUser(entity.user);

    data.__raw = entity;

    return data;
  },
});
