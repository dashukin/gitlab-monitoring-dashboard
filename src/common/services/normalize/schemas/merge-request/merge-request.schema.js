import { schema } from 'normalizr';
import cloneDeep from 'lodash/cloneDeep';
import {
  convertRawUser,
  extractMergeRequestIssues,
  extractMilestone,
} from '../helpers/schema.helpers';

/**
 * @typedef {Object} RawTimeStats
 *
 * @property {Number} time_estimate
 * @property {Number} total_time_spent
 * @property {*|Null} human_time_estimate
 * @property {*|Null} human_total_time_spent
 */

/**
 * @typedef {Object} RawMergeRequest
 *
 * @proeprty {RawUser} assignee
 * @property {RawUser} author
 * @property {String} created_at - date created
 * @property {String} description - description
 * @property {*|null} discussion_locked
 * @property {Number} downvotes
 * @property {Boolean} force_remove_source_branch
 * @property {Number} id
 * @property {Number} iid
 * @property {String[]} labels
 * @property {String|Null} merge_commit_sha
 * @property {String} merge_status e.g. can_be_merged/etc
 * @property {Boolean} merge_when_pipeline_succeeds
 * @property {RawMilestone} milestone
 * @property {Number} project_id
 * @property {String} sha
 * @property {*|null} should_remove_source_branch
 * @property {String} source_branch
 * @property {Number} source_project_id
 * @property {Boolean} squash
 * @property {String} state - e.g. opened/etc
 * @property {String} target_branch
 * @property {Number} target_project_id
 * @property {RawTimeStats} time_stats
 * @property {String} title
 * @property {String} updated_at - date updated
 * @property {String} updated_at - date updated
 * @property {Number} upvotes
 * @property {Number} user_notes_count
 * @property {String} web_url
 * @property {Boolean} work_in_progress
 */

/**
 * @typedef {Object} MergeRequest
 *
 * @property {Number} id
 * @property {Number} projectId
 * @property {User} projectId
 * @property {User} author
 * @property {String} createAt
 */


export const mergeRequestSchema = new schema.Entity('mergeRequest', {}, {
  processStrategy(entity) {
    const mergeRequestData = {};

    mergeRequestData.id = entity.id;
    mergeRequestData.iid = entity.iid;
    mergeRequestData.projectId = entity.project_id;
    mergeRequestData.assignee = convertRawUser(entity.assignee);
    mergeRequestData.author = convertRawUser(entity.author);
    mergeRequestData.state = entity.state;
    mergeRequestData.milestone = entity.milestone ? extractMilestone(entity.milestone) : null;
    mergeRequestData.upvotes = entity.upvotes;
    mergeRequestData.downvotes = entity.downvotes;
    mergeRequestData.userNotesCount = entity.user_notes_count;
    mergeRequestData.labels = Array.isArray(entity.labels) ? entity.labels : [];
    mergeRequestData.title = entity.title;
    mergeRequestData.description = entity.description;
    mergeRequestData.createdAt = entity.created_at;
    mergeRequestData.jiraIssues = extractMergeRequestIssues(entity.title);

    mergeRequestData.__raw = cloneDeep(entity);

    return mergeRequestData;
  },
});
