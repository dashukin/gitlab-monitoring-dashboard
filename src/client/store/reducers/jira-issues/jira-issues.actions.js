/*
* Actions
* */

import jiraIssuesConstants from './jira-issues.constants';

const {
  JIRA_ISSUES_FETCH,
  JIRA_ISSUES_FETCH_SUCCESS,
  JIRA_ISSUES_FETCH_ERROR,
} = jiraIssuesConstants;

export const fetchJiraIssues = () => ({
  type: JIRA_ISSUES_FETCH,
});

export const fetchJiraIssuesSuccess = payload => ({
  type: JIRA_ISSUES_FETCH_SUCCESS,
  payload,
});

export const fetchJiraIssuesError = error => ({
  type: JIRA_ISSUES_FETCH_ERROR,
  payload: error,
});
