import Api from 'src/common/services/api';

class GitlabApi extends Api {
  constructor(props) {
    const extendedProps = {
      ...props,
      baseURL: '/api/gitlab',
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

  fetchProjects = () => this.get('/projects');

  fetchProject = id => this.get(`/projects/${id}`);

  fetchMergeRequests = id => this.get(`/projects/${id}/merge-requests`);
}

export default GitlabApi;
