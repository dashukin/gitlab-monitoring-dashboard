/*
* Reducer
* */

import get from 'lodash/get';
import jiraIssuesConstants from './jira-issues.constants';

const {
  JIRA_ISSUES_FETCH_SUCCESS,
  JIRA_ISSUES_FETCH_ERROR,
} = jiraIssuesConstants;

const initialState = {
  ids: [],
  error: undefined,
};

const jiraIssues = (state = initialState, action) => {
  switch (action.type) {
    case JIRA_ISSUES_FETCH_SUCCESS: {
      const ids = action.payload;

      return { ...state, ids };
    }

    case JIRA_ISSUES_FETCH_ERROR: {
      const error = get(action, 'payload');

      return { ...state, error };
    }

    default:
      return state;
  }
};

export default jiraIssues;
