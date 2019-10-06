import envConfig from 'src/server/utils/env-config';
import GitlabApi from 'src/server/services/api/gitlab';
import { createServerServices } from 'src/common/services';
import { createServerHistory } from 'src/common/history';
import { createServerSideLocation } from './helpers/services.helper';
import JiraApi from '../../services/api/jira/jira.api';

const {
  GITLAB_HOST,
  GITLAB_ACEESS_TOKEN,
  JIRA_HOST,
  JIRA_BASIC_TOKEN,
  JIRA_API_VERSION,
} = envConfig;

/**
 *
 * @param {Object} options
 * @param {Object} options.logger
 * @return {Function}
 */
const servicesMiddleware = options => (req, res, next) => {
  const location = createServerSideLocation(req);
  const { cookies: cookie } = req;
  const services = createServerServices({
    location,
    cookie,
  });

  services.gitlabBackendApi = new GitlabApi({
    host: GITLAB_HOST,
    token: GITLAB_ACEESS_TOKEN,
    version: 'v4',
  });

  services.jiraBackendApi = new JiraApi({
    host: JIRA_HOST,
    token: JIRA_BASIC_TOKEN,
    version: JIRA_API_VERSION,
  });

  const { logger } = options;

  res.locals.logger = logger;
  res.locals.services = services;
  res.locals.history = createServerHistory({
    path: req.path,
  });
  next();
};

export default servicesMiddleware;
