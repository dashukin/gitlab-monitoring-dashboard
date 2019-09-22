import { createSelector } from 'reselect';
import get from 'lodash/get';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy';
import { getProjectsEntities } from 'src/client/selectors/common/projects.selector';
import { getMergeRequestsEntities } from 'src/client/selectors/common/merge-requests.selector';
import { getProjectDataMap } from 'src/client/selectors/common/project.selector';

export const getProjectId = (state) => {
  const id = get(state, 'location.payload.projectId');
  const output = Number(id);

  return output;
};

export const getCurrentProject = createSelector(
  [getProjectsEntities, getProjectId],
  (projectsEntities, projectId) => projectsEntities[projectId],
);

/**
 *
 * @return {MergeRequest[]}
 */
export const getCurrentProjectMergeRequests = createSelector(
  [getMergeRequestsEntities, getProjectId],
  (mergeRequestEntities, projectId) => {
    const projectMRs = pickBy(mergeRequestEntities, mr => mr.projectId === projectId);
    const projectMRsList = map(projectMRs, mr => mr);
    const sortedMrsList = sortBy(projectMRsList, 'createdAt');

    return sortedMrsList;
  },
);

/**
 *
 * @return {ProjectInteractionState}
 */
export const getCurrentProjectInteractionState = createSelector(
  [getProjectDataMap, getProjectId],
  (projectDataMap, projectId) => {
    const output = projectDataMap[projectId];

    return output;
  },
);

export const getCurrentProjectIsLoading = createSelector(
  [getCurrentProjectInteractionState],
  (interactionState) => {
    const isLoading = get(interactionState, 'isLoading', false);

    return isLoading;
  },
);
