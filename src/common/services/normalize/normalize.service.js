// eslint-disable-next-line no-unused-vars
import { normalize, denormalize } from 'normalizr';

import exampleSchema from './schemas/__example.schema';
import { projectSchema } from './schemas/project';
import { mergeRequestSchema } from './schemas/merge-request';

export const normalizeExampleData = data => normalize(data, exampleSchema);

export const normalizeProject = data => normalize(data, projectSchema);
export const normalizeProjects = data => normalize(data, [projectSchema]);

export const normalizeMergeRequests = data => normalize(data, [mergeRequestSchema]);
