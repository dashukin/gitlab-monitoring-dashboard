import { Router } from 'express';
import {
  getProjects,
  getProjectMergeRequests,
} from './projects';

const apiRouter = Router();

apiRouter.get('/projects/(:projectId)?', getProjects);
apiRouter.get('/projects/:projectId/merge-requests', getProjectMergeRequests);

export default apiRouter;
