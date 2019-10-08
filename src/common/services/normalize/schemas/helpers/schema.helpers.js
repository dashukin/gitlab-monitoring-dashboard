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


export const getJiraIssuePattern = () => /(\w+-\d+)+/gm;

/**
 * Extract issues from merge request title
 * @param {String} title
 * @return {String[]} - list of jira issues
 */
export const extractMergeRequestIssues = (string) => {
  const pattern = getJiraIssuePattern();
  const issues = string.match(pattern);
  const output = !issues
    ? []
    : issues.map(issueId => issueId.replace('[', '').replace(']', ''));

  return output;
};

/**
 * @typedef {Object} RawMilestone
 *
 * @property {Number} id
 * @property {Number} iid
 * @property {String} project_id
 * @property {String} title
 * @property {String} description
 * @property {String} state - e.g. 'active'
 */


/**
 * @typedef {Object} Milestone
 *
 * @property {Number} id
 * @property {Number} iid
 * @property {String} projectId
 * @property {String} title
 * @property {String} description
 * @property {String} state - e.g. 'active'
 */

/**
 *
 * @param {RawMilestone} data
 * @return {Milestone}
 */
export const extractMilestone = (data) => {
  const milestone = {
    id: data.id,
    iid: data.iid,
    projectId: data.project_id,
    title: data.title,
    description: data.description,
    state: data.state,
  };

  return milestone;
};
