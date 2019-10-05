import { createSelector } from 'reselect';
import getOr from 'lodash/fp/getOr';
import map from 'lodash/map';
import pick from 'lodash/pick';

export const getJiraIssuesIds = getOr(Object.freeze([]), 'jiraIssues.ids');
export const getJiraIssuesEntities = getOr(Object.freeze({}), 'db.jiraIssues');

export const getJiraIssues = createSelector(
  [getJiraIssuesIds, getJiraIssuesEntities],
  (ids, entities) => {
    const jiraIssues = map(pick(entities, ids), issue => issue);

    return jiraIssues;
  },
);
