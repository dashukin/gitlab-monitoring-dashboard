import { createSelector } from 'reselect';
import getOr from 'lodash/fp/getOr';
import map from 'lodash/map';
import pick from 'lodash/pick';

export const getProjectsIds = getOr(Object.freeze([]), 'projects.ids');

export const getProjectsEntities = getOr(Object.freeze({}), 'db.projects');

export const getProjects = createSelector(
  [getProjectsIds, getProjectsEntities],
  (projectIds, projectEntities) => {
    const projects = map(pick(projectEntities, projectIds), entity => entity);

    return projects;
  },
);
