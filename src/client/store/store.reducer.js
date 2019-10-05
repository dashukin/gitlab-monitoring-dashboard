import { combineReducers } from 'redux';
import page from 'src/client/store/reducers/page/page.reducer';
import db from 'src/client/store/reducers/db/db.reducer';
import projectData from 'src/client/store/reducers/project/project.reducer';
import projects from 'src/client/store/reducers/projects/projects.reducer';
import mergeRequests from 'src/client/store/reducers/merge-requests/merge-requests.reducer';
import jiraIssues from 'src/client/store/reducers/jira-issues/jira-issues.reducer';

export const reducers = {
  db,
  page,
  projectData,
  projects,
  mergeRequests,
  jiraIssues,
};

export const createCombinedReducers = extraReducers => (
  combineReducers({ ...reducers, ...extraReducers })
);
