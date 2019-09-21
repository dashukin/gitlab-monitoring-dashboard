import Api from 'src/common/services/api';

class ProjectsApi extends Api {
  constructor(props) {
    const extendedProps = {
      ...props,
      baseURL: '/api',
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
}

export default ProjectsApi;
