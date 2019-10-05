import { connect } from 'react-redux';
import { fetchProject } from 'src/client/store/reducers/projects/projects.actions';
import { fetchMergeRequests } from 'src/client/store/reducers/merge-requests/merge-requests.actions';
import { fetchProjectData } from 'src/client/store/reducers/project/project.actions';
import { getProjectId, getCurrentProject } from 'src/client/selectors/composed/project/project.selector';
import { getCurrentProjectCombinedMergeRequests } from 'src/client/selectors/composed/project/project.selector';
import {
  getCurrentProjectIsLoading,
} from 'src/client/selectors/composed/project/project.selector';
import Project from './project.component';

const mapStateToProps = state => ({
  projectId: getProjectId(state),
  project: getCurrentProject(state),
  mergeRequests: getCurrentProjectCombinedMergeRequests(state),
  isLoading: getCurrentProjectIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProjectData: payload => dispatch(fetchProjectData(payload)),
  fetchProject: payload => dispatch(fetchProject(payload)),
  fetchMergeRequests: payload => dispatch(fetchMergeRequests(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
