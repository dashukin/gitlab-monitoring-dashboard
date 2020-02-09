import chainalize from 'chainalize';
import envConfig from 'src/server/utils/env-config';
import GitlabApi from './api/gitlab';
import JiraApi from './api/jira';

const {
  GITLAB_HOST,
  GITLAB_ACEESS_TOKEN,
  JIRA_HOST,
  JIRA_BASIC_TOKEN,
  JIRA_API_VERSION,
} = envConfig;

export const createServerServices = () => chainalize({
  GitlabApi: [GitlabApi, {
    host: GITLAB_HOST,
    token: GITLAB_ACEESS_TOKEN,
    version: 'v4',
  }],
  JiraApi: [JiraApi, {
    host: JIRA_HOST,
    token: JIRA_BASIC_TOKEN,
    version: JIRA_API_VERSION,
  }],
});
