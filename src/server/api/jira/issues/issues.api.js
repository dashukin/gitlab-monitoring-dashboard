import get from 'lodash/get';

import {
  normalizeJiraIssues,
} from 'src/common/services/normalize/index';

export const getIssues = async (req, res) => {
  const { services, logger } = res.locals;
  const { jiraApi } = services;
  try {
    const jiraIds = req.body;
    const response = await jiraApi.fetchIssuesByIds(jiraIds);
    const { issues } = response.data;

    const normalizedData = normalizeJiraIssues(issues);

    logger.debug('normalizedProjectsResponseData', normalizedData);

    res.json(normalizedData);
  } catch (error) {
    console.dir(error);
    logger.error(error);
    const responseStatus = get(error, 'response.status') || 500;
    res.status(responseStatus);
    res.send('error handling to be done...');
  }
};
