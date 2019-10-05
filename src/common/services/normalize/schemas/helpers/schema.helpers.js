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


export const getJiraIssuePattern = () => /(?:\[)\w+-\d+(?:\])/g;

/**
 * Extract issues from merge request title
 * @param {String} title
 * @return {String[]} - list of jira issues
 */
export const extractMergeRequestIssues = (title) => {
  const pattern = getJiraIssuePattern();
  const issues = title.match(pattern);
  const output = !issues
    ? []
    : issues.map(issueId => issueId.replace('[', '').replace(']', ''));

  return output;
};
