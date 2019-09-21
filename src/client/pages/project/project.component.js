import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    const {
      fetchProject,
      fetchMergeRequests,
    } = this.props;

    fetchProject(projectId);
    fetchMergeRequests(projectId);
  }

  render() {
    const output = (
      <div>Project page</div>
    );
    return output;
  }
}

ProjectPage.propTypes = {
  projectId: PropTypes.string,
  fetchProject: PropTypes.func.isRequired,
  fetchMergeRequests: PropTypes.func.isRequired,
};

ProjectPage.defaultProps = {
  projectId: undefined,
};

export default ProjectPage;
