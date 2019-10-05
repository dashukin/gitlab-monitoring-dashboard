import Api from 'src/common/services/api';
import merge from 'lodash/merge';

class JiraApi extends Api {
  constructor(props) {
    const mergedProps = {
      ...props,
      baseURL: `${props.host}/rest/api/${props.version}`,
      responseType: 'json',
    };
    super(mergedProps);

    this._applyRequestInterceptors([
      this.createRequestInterceptor({
        token: props.token,
      }),
    ]);

    this._applyResponseInterceptors([
      this.createResponseInterceptor(),
    ]);
  }

  createRequestInterceptor = ({ token }) => config => merge(config, {
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  createResponseInterceptor = () => (config) => {
    const output = {
      ...config,
      data: JSON.parse(config.data),
    };

    return output;
  }

  /**
   *
   * @param {String|String[]} issueId
   */
  fetchIssuesByIds = (issuesIds) => {
    const ids = [].concat(issuesIds);
    const jql = `key IN (${ids.join(',')})`;
    const request = this.post('/search', undefined, JSON.stringify({
      jql,
    }));

    return request;
  }
}

export default JiraApi;
