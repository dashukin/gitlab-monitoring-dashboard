/*
* Reducer
* */

import projectConstants from './project.constants';

const {
  PROJECT_DATA_FETCH,
  PROJECT_DATA_FETCH_SUCCESS,
  PROJECT_DATA_FETCH_ERROR,
} = projectConstants;

/**
 * @typedef {Object} ProjectInteractionState
 *
 * @property {Boolean} isLoading
 * @property {Boolean} hasError
 */

const initialState = {};

const projectData = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_DATA_FETCH: {
      const projectId = action.payload;

      return {
        ...state,
        [projectId]: {
          isLoading: true,
          hasError: false,
        },
      };
    }

    case PROJECT_DATA_FETCH_SUCCESS: {
      const projectId = action.payload;

      return {
        ...state,
        [projectId]: {
          isLoading: false,
          hasError: false,
        },
      };
    }

    case PROJECT_DATA_FETCH_ERROR: {
      const projectId = action.payload;

      return {
        ...state,
        [projectId]: {
          isLoading: false,
          hasError: true,
        },
      };
    }

    default:
      return state;
  }
};

export default projectData;
