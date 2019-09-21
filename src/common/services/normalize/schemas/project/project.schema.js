import { schema } from 'normalizr';
import cloneDeep from 'lodash/cloneDeep';

/**
 * @typedef {Object} RawProject
 *
 * @proeprty {Number} id - project id
 * @property {String} name - project name
 * @property {String} name_with_namespace - project name with namespace
 */

/**
 * @typedef {Object} Project
 *
 * @property {String} name - project display name
 * @property {Number} id - project id
 */


// archived: false
// avatar_url: null
// ci_config_path: null
// container_registry_enabled: true
// created_at: "2019-08-21T13:30:47.806Z"
// creator_id: 594
// default_branch: "master"
// description: ""
// forks_count: 0
// http_url_to_repo: "https://git.developers.burberry.com/web/identity.git"
// id: 2271
// import_status: "none"
// issues_enabled: true
// jobs_enabled: true
// last_activity_at: "2019-09-06T15:40:23.228Z"
// lfs_enabled: true
// merge_method: "merge"
// merge_requests_enabled: true
// name: "identity"
// name_with_namespace: "Web / identity"
// namespace: {id: 499, name: "Web", path: "web", kind: "group", full_path: "web", …}
// only_allow_merge_if_all_discussions_are_resolved: false
// only_allow_merge_if_pipeline_succeeds: false
// open_issues_count: 0
// path: "identity"
// path_with_namespace: "web/identity"
// permissions: {project_access: null, group_access: {…}}
// printing_merge_request_link_enabled: true
// public_jobs: true
// readme_url: "https://git.developers.burberry.com/web/identity/blob/master/README.md"
// request_access_enabled: false
// resolve_outdated_diff_discussions: false
// shared_runners_enabled: true
// shared_with_groups: []
// snippets_enabled: true
// ssh_url_to_repo: "git@git.developers.burberry.com:web/identity.git"
// star_count: 0
// tag_list: []
// visibility: "internal"
// web_url: "https://git.developers.burberry.com/web/identity"
// wiki_enabled: true
// _links: {self: "https://git.developers.burberry.com/api/v4/projects/2271", issues: "https://git.developers.burberry.com/api/v4/projects/2271/issues", merge_requests: "https://git.developers.burberry.com/api/v4/projects/2271/merge_requests", repo_branches: "https://git.developers.burberry.com/api/v4/projects/2271/repository/branches", labels: "https://git.developers.burberry.com/api/v4/projects/2271/labels", …}


export const projectSchema = new schema.Entity('project', {}, {
  idAttribute: 'id',
  processStrategy(entity) {
    const project = {};

    project.id = entity.id;
    project.name = entity.name_with_namespace || entity.name;

    if (!PRODUCTION) {
      project.__raw = cloneDeep(entity);
    }

    return project;
  },
});
