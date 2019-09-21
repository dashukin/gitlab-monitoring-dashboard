import Api from 'src/common/services/api';
import merge from 'lodash/merge';

class GitlabApi extends Api {
  constructor(props) {
    const mergedProps = {
      ...props,
      baseURL: `${props.host}/api/${props.version}`,
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
      'private-token': token,
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
   * @param {String} id - project id
   * @return {*}
   */
  fetchProject = (id) => {
    const request = this.get(`/projects/${id}`);

    return request;
  };

  fetchProjects = () => {
    const request = this.get('/projects/');

    return request;
  };

  /**
   *
   * @param {String} projectId
   * @param {Object} options
   * @param {String} options.state
   * @return {*}
   */
  fetchProjectMergeRequests = (projectId, options = {}) => {
    const { state = 'opened' } = options;
    const request = this.get(`/projects/${projectId}/merge_requests`, {
      state,
    });

    return request;
  }
}

export default GitlabApi;
