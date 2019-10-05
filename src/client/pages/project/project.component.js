import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProjectMergeRequests from './components/project-merge-requests';

class ProjectPage extends PureComponent {
  componentDidMount() {
    const {
      projectId,
    } = this.props;

    if (projectId) {
      this.fetchProject(projectId);
    }
  }

  componentDidUpdate(prevProps) {
    const { projectId: prevProjectId } = prevProps;
    const { projectId } = this.props;

    if (projectId && (prevProjectId !== projectId)) {
      this.fetchProject(projectId);
    }
  }

  fetchProject(projectId) {
    this.props.fetchProjectData(projectId);
  }

  getMergeRequestsOutput() {
    const {
      mergeRequests,
    } = this.props;

    const output = (
      <ProjectMergeRequests
        mergeRequests={mergeRequests}
      />
    );

    return output;
  }

  getloadingOutput() {
    return 'loading...';
  }

  getRenderingOutput() {
    const { isLoading, project } = this.props;
    const output = !project || isLoading ? this.getloadingOutput() : this.getMergeRequestsOutput();
    return output;
  }

  render() {
    const mergeRequests = this.getRenderingOutput();
    const output = (
      <div>
        <div>Project page</div>
        {mergeRequests}
      </div>
    );
    return output;
  }
}

ProjectPage.propTypes = {
  projectId: PropTypes.number,
  project: PropTypes.shape({}),
  fetchProjectData: PropTypes.func.isRequired,
  mergeRequests: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
};

ProjectPage.defaultProps = {
  projectId: undefined,
  project: undefined,
  mergeRequests: [],
  isLoading: false,
};

export default ProjectPage;
