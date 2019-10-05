import { Router } from 'express';
import {
  getProjects,
  getProjectMergeRequests,
} from './gitlab/projects';
import {
  getIssues,
} from './jira/issues';

const apiRouter = Router();

apiRouter.get('/gitlab/projects/(:projectId)?', getProjects);
apiRouter.get('/gitlab/projects/:projectId/merge-requests', getProjectMergeRequests);

apiRouter.post('/jira/issues', getIssues);

export default apiRouter;
