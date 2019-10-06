import {
  normalizeProject,
  normalizeProjects,
  normalizeMergeRequests,
} from 'src/common/services/normalize';

export const getProjects = async (req, res) => {
  const { services, logger } = res.locals;
  const { gitlabBackendApi } = services;
  try {
    const { projectId } = req.params;
    let apiRequest;
    const apiRequestArgs = [];

    if (projectId) {
      apiRequest = gitlabBackendApi.fetchProject;
      apiRequestArgs.push(projectId);
    } else {
      apiRequest = gitlabBackendApi.fetchProjects;
    }

    const response = await apiRequest.apply(gitlabBackendApi, apiRequestArgs);
    const normalizeFn = projectId ? normalizeProject : normalizeProjects;
    const { data } = response;

    const normalizedData = normalizeFn(data);

    logger.debug('normalizedProjectsResponseData', normalizedData);

    res.json(normalizedData);
  } catch (error) {
    logger.error(error);
  }
};


export const getProjectMergeRequests = async (req, res) => {
  const { services, logger } = res.locals;
  const { gitlabBackendApi } = services;
  try {
    const { projectId } = req.params;
    const response = await gitlabBackendApi.fetchProjectMergeRequests(projectId);
    const { data } = response;

    const normalizedData = normalizeMergeRequests(data);

    logger.debug('normalizedData', normalizedData);

    res.json(normalizedData);
  } catch (error) {
    logger.error(error);
  }
};

export const getProjectMergeRequestAwardEmoji = async (req, res) => {
  const { services, logger } = res.locals;
  const { gitlabBackendApi } = services;

  try {
    const { projectId, mergeRequestId } = req.params;
    const response = await gitlabBackendApi.fetchProjectMergeRequestAwardEmoji({
      projectId,
      mergeRequestId,
    });
    const { data } = response;

    res.json(data);
  } catch (error) {
    logger.error(error);
  }
};
