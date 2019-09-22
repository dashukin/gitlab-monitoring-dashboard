import getOr from 'lodash/fp/getOr';

export const getProjectDataMap = getOr(Object.freeze({}), 'projectData');
