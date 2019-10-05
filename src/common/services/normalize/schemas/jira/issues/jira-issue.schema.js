import { schema } from 'normalizr';

/**
 * @typedef {Object} RawJiraAssignee
 *
 * @property {String} accountId
 * @property {String} accountType
 * @property {Boolean} active
 * @property {String} displayName
 * @property {String} key
 * @property {String} name
 * @property {String} self
 * @property {String} timeZone
 */

/**
 * @typedef {Object} RawJiraIssuePriority
 *
 * @property {String} iconUrl
 * @property {String} id
 * @property {String} name
 */

/**
 * @typedef {Object} RawJiraIssueResolution
 *
 * @property {String} description
 * @property {String} id
 * @property {String} name
 * @property {String} self
 */

/**
 * @typedef {Object} RawJiraIssueStatus
 *
 * @property {String} description
 * @property {String} iconUrl
 * @property {String} id
 * @property {String} name
 * @property {String} self
 */

/**
 * @typedef {Object} RawJiraIssue
 *
 * @property {String} id
 * @property {String} key
 * @property {String} self
 * @property {Object} fields
 * @property {RawJiraAssignee} fields.assignee
 * @property {RawJiraAssignee} fields.creator
 * @property {String} fields.description
 * @property {String[]} fields.labels
 * @property {RawJiraIssuePriority} fields.priority
 * @property {RawJiraIssueResolution} fields.resolution
 * @property {RawJiraIssueStatus} fields.status
 * @property {RawJiraIssue[]} fields.subtasks
 * @property {String} fields.summary
 */

export const jiraIssueSchema = new schema.Entity('issue', {}, {
  processStrategy(entity) {
    return entity;
  },
});
