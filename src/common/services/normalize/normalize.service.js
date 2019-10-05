// eslint-disable-next-line no-unused-vars
import { normalize, denormalize } from 'normalizr';

import exampleSchema from './schemas/__example.schema';
import { projectSchema } from './schemas/project';
import { mergeRequestSchema } from './schemas/merge-request';
import { jiraIssueSchema } from './schemas/jira/issues';

export const normalizeExampleData = data => normalize(data, exampleSchema);

export const normalizeProject = data => normalize(data, projectSchema);
export const normalizeProjects = data => normalize(data, [projectSchema]);

export const normalizeMergeRequests = data => normalize(data, [mergeRequestSchema]);

export const normalizeJiraIssue = data => normalize(data, jiraIssueSchema);
export const normalizeJiraIssues = data => normalize(data, [jiraIssueSchema]);
