/**
 * @typedef {Object} RawUser
 *
 * @property {Number} id
 * @property {String} name
 * @property {String} username
 * @property {String} state - e.g. active/tbd
 */

/**
 * @typedef {Object} User
 *
 * @property {Number} id
 * @property {String} name
 * @property {String} username
 * @property {String} state
 */

/**
 *
 * @param {RawUser} rawUserData
 * @return {User}
 */

export const convertRawUser = (rawUserData) => {
  const userData = !rawUserData ? undefined : {
    id: rawUserData.id,
    name: rawUserData.name,
    username: rawUserData.username,
    state: {
      active: rawUserData.state === 'active',
    },
  };

  return userData;
};
