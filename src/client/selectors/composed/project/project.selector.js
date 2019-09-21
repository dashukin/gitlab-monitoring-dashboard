import { createSelector } from 'reselect';
import get from 'lodash/get';
import { getProjectsEntities } from 'src/client/selectors/common/projects.selector';

export const getProjectId = state => get(state, 'location.payload.projectId');

export const getCurrentProject = createSelector(
  [getProjectsEntities, getProjectId],
  (projectsEntities, projectId) => projectsEntities[projectId],
);
