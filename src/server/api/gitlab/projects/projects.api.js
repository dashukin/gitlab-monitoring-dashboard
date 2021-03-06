import {
  normalizeProject,
  normalizeProjects,
  normalizeMergeRequests,
  normalizeAwardEmojis,
} from 'src/common/services/normalize';

export const getProjects = async (req, res) => {
  const { services, logger } = res.locals;
  const { gitlabApi } = services;
  try {
    const { projectId } = req.params;
    let apiRequest;
    const apiRequestArgs = [];

    if (projectId) {
      apiRequest = gitlabApi.fetchProject;
      apiRequestArgs.push(projectId);
    } else {
      apiRequest = gitlabApi.fetchProjects;
    }

    const response = await apiRequest.apply(gitlabApi, apiRequestArgs);
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
  const { gitlabApi } = services;
  try {
    const { projectId } = req.params;
    const response = await gitlabApi.fetchProjectMergeRequests(projectId);
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
  const { gitlabApi } = services;

  try {
    const { projectId } = req.params;
    const mergeRequestsIids = Array.isArray(req.body) ? req.body : [];

    const requestsList = mergeRequestsIids.map((iid) => {
      const request = gitlabApi.fetchProjectMergeRequestAwardEmoji({
        projectId,
        mergeRequestIid: iid,
      });

      return request;
    });

    const responsesList = await Promise.all(requestsList);
    const aggregatedData = responsesList.reduce((acc, response) => {
      const { data } = response;
      const concatenatedData = acc.concat(data);

      return concatenatedData;
    }, []);

    const normalizedData = normalizeAwardEmojis(aggregatedData);

    res.json(normalizedData);
  } catch (error) {
    logger.error(error);
  }
};
