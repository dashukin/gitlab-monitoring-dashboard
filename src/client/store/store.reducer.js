import { combineReducers } from 'redux';
import page from 'src/client/store/reducers/page/page.reducer';
import db from 'src/client/store/reducers/db/db.reducer';
import projects from 'src/client/store/reducers/projects/projects.reducer';
import mergeRequests from 'src/client/store/reducers/merge-requests/merge-requests.reducer';
import example from 'src/client/store/reducers/__example/example.reducer';

export const reducers = {
  db,
  page,
  projects,
  mergeRequests,
  example,
};

export const createCombinedReducers = extraReducers => (
  combineReducers({ ...reducers, ...extraReducers })
);
