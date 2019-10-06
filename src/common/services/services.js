import chainalize from 'chainalize';
import I18nService from 'src/common/services/i18n';
import I18nApi from 'src/common/services/api/i18n';
import CookieService from 'src/common/services/cookie';
import LocationService from 'src/common/services/location';
import GitlabApi from 'src/common/services/api/gitlab';
import JiraApi from 'src/common/services/api/jira';

/**
 *
 * @param {Object} options
 * @param {Object} options.services
 * @param {Object} options.location
 * @param {Object|String} options.cookie
 * @return {*}
 */
export const createClientServices = (options = {}) => {
  const { location, cookie } = options;
  const servicesMap = chainalize({
    CookieService,
    LocationService,
    I18nService,
    I18nApi,
    GitlabApi,
    JiraApi,
  }, {
    location,
    cookie,
  });

  return servicesMap;
};

/**
 *
 * @param {Object} options
 * @param {Object} options.services
 * @param {Object} options.location
 * @param {Object|String} options.cookie
 * @return {*}
 */
export const createServerServices = (options = {}) => {
  const { location, cookie } = options;
  const servicesMap = chainalize({
    CookieService,
    LocationService,
    I18nService,
    I18nApi,
  }, {
    location,
    cookie,
  });

  return servicesMap;
};
