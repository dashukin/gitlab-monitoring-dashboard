import { Router } from 'express';
import {
  getProjects,
  getProjectMergeRequests,
  getProjectMergeRequestAwardEmoji,
} from './gitlab/projects';
import {
  getIssues,
} from './jira/issues';

const apiRouter = Router();

apiRouter.get('/gitlab/projects/(:projectId)?', getProjects);
apiRouter.get('/gitlab/projects/:projectId/merge-requests', getProjectMergeRequests);
apiRouter.post('/gitlab/projects/:projectId/merge-requests/award-emoji', getProjectMergeRequestAwardEmoji);

apiRouter.post('/jira/issues', getIssues);

export default apiRouter;
