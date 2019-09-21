import chainalize from 'chainalize';
import I18nService from 'src/common/services/i18n';
import I18nApi from 'src/common/services/api/i18n';
import CookieService from 'src/common/services/cookie';
import LocationService from 'src/common/services/location';
import ProjectsApi from 'src/common/services/api/projects';

export const commonServicesMap = {
  CookieService,
  LocationService,
  I18nService,
  I18nApi,
  ProjectsApi,
};

export const clientServicesMap = {
  ...commonServicesMap,
};

export const serverServicesMap = {
  ...commonServicesMap,
};

/**
 *
 * @param {Object} options
 * @param {Object} options.services
 * @param {Object} options.location
 * @param {Object|String} options.cookie
 * @return {*}
 */
export const createServices = (options = {}) => {
  const { location, cookie, services } = options;
  const servicesMap = chainalize({
    ...services,
  }, {
    location,
    cookie,
  });

  return servicesMap;
};

/**
 * Create client specific services
 * @param {Object} options
 * @param {Object} options.location
 * @param {Object} options.cookie
 * @return {*}
 */
export const createClientServices = options => createServices({
  ...options,
  services: clientServicesMap,
});

/**
 * Create client specific services
 * @param {Object} options
 * @param {Object} options.location
 * @param {Object} options.cookie
 * @return {*}
 */
export const createServerServices = options => createServices({
  ...options,
  services: serverServicesMap,
});
