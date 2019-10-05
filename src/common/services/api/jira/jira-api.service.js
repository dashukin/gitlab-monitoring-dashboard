import Api from '../index';

class JiraApi extends Api {
  constructor(props) {
    const extendedProps = {
      ...props,
      baseURL: '/api/jira',
    };

    super(extendedProps);

    this._applyResponseInterceptors([
      this.createResponseInterceptor(),
    ]);
  }

  createResponseInterceptor = () => (config) => {
    const output = {
      ...config,
      data: JSON.parse(config.data),
    };

    return output;
  };

  /**
   *
   * @param {String|String[]} ids
   * @return {*}
   */
  fetchIssues = (ids) => {
    const request = this.post('/issues', undefined, JSON.stringify(ids));

    return request;
  };
}

export default JiraApi;
