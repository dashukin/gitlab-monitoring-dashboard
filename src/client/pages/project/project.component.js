import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProjectMergeRequests from './components/project-merge-requests';

import './project.scss';

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
    const loader = (
      <CircularProgress className="project-page__loader" />
    );

    return loader;
  }

  getRenderingOutput() {
    const { isLoading, project } = this.props;
    const output = !project || isLoading ? this.getloadingOutput() : this.getMergeRequestsOutput();
    return output;
  }

  render() {
    const mergeRequests = this.getRenderingOutput();
    const output = (
      <div className="project-page">
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
