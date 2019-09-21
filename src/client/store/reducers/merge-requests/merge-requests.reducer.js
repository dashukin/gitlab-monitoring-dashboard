/*
* Reducer
* */

import mergeRequestsConstants from './merge-requests.constants';

const {
  PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_ERROR,
} = mergeRequestsConstants;

const initialState = {
  ids: undefined,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_FETCH_SUCCESS: {
      const ids = action.payload;

      return { ...state, ids, error: false };
    }

    case PROJECTS_FETCH_ERROR: {
      const error = action.payload;

      return { ...state, error };
    }

    default:
      return state;
  }
};

export default projects;
