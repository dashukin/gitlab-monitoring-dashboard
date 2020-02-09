import { createServerHistory } from 'src/common/history';
import { createServerServices } from '../../services/services';


/**
 *
 * @param {Object} options
 * @param {Object} options.logger
 * @return {Function}
 */
const servicesMiddleware = options => (req, res, next) => {
  const services = createServerServices();

  const { logger } = options;

  res.locals.logger = logger;
  res.locals.services = services;
  res.locals.history = createServerHistory({
    path: req.path,
  });
  next();
};

export default servicesMiddleware;
