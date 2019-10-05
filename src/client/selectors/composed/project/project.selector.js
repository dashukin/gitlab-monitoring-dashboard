import { createSelector } from 'reselect';
import get from 'lodash/get';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import { getProjectsEntities } from 'src/client/selectors/common/projects.selector';
import { getMergeRequestsEntities } from 'src/client/selectors/common/merge-requests.selector';
import { getProjectDataMap } from 'src/client/selectors/common/project.selector';
import { getJiraIssues } from 'src/client/selectors/common/jira-issues.selector';

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

// ectract jira issues ids from merge requests
export const getCurrentProjectMergeRequestsIssues = createSelector(
  [getCurrentProjectMergeRequests],
  /**
   *
   * @param mergeRequests
   * @return {String[]}
   */
  (mergeRequests) => {
    const jiraIssues = reduce(mergeRequests, (result, mr) => {
      if (mr.jiraIssues.length) {
        // eslint-disable-next-line no-param-reassign
        result = result.concat(mr.jiraIssues);
      }

      return result;
    }, []);

    return jiraIssues;
  },
);

export const getCurrentProjectJiraIssues = createSelector(
  [getCurrentProjectMergeRequestsIssues, getJiraIssues],
  (jiraIssuesList, jiraIssues) => {
    const currentProjectJiraIssuesMap = reduce(jiraIssuesList, (acc, jiraIssueKey) => {
      const jiraIssue = find(jiraIssues, { key: jiraIssueKey });
      if (jiraIssue) {
        acc[jiraIssueKey] = jiraIssue;
      }

      return acc;
    }, {});

    return currentProjectJiraIssuesMap;
  },
);

export const getCurrentProjectCombinedMergeRequests = createSelector(
  [
    getCurrentProjectMergeRequests,
    getCurrentProjectJiraIssues,
  ],
  (mergeRequests, jiraIssues) => {
    /**
     *
     * @type {Array}
     */
    const clonedMergeRequests = cloneDeep(mergeRequests);
    const mergeRequestsWithJiraIssuesEntities = clonedMergeRequests
      .map((mergeRequest) => {
        const mergeRequestIssuesKeys = mergeRequest.jiraIssues;
        // replace issue keys with issue entities and filter them
        const jiraIssuesByJiraIssuesKeysList = mergeRequestIssuesKeys
          .map(jiraIssueKey => jiraIssues[jiraIssueKey])
          .filter(jiraIssue => !!jiraIssue);

        // eslint-disable-next-line no-param-reassign
        mergeRequest.jiraIssues = jiraIssuesByJiraIssuesKeysList;

        return mergeRequest;
      });

    return mergeRequestsWithJiraIssuesEntities;
  },
);
