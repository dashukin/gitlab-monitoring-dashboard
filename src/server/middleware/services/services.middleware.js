import envConfig from 'src/server/utils/env-config';
import GitlabApi from 'src/server/services/api/gitlab';
import { createServerServices } from 'src/common/services';
import { createServerHistory } from 'src/common/history';
import { createServerSideLocation } from './helpers/services.helper';

const {
  GITLAB_HOST,
  GITLAB_ACEESS_TOKEN,
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

  services.gitlabApi = new GitlabApi({
    host: GITLAB_HOST,
    token: GITLAB_ACEESS_TOKEN,
    version: 'v4',
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
