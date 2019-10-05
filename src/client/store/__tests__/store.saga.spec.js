import { fork, spawn } from 'redux-saga/effects';
import map from 'lodash/map';

import {
  initI18n,
  watchI18n,
} from 'src/client/store/reducers/i18n/i18n.saga';

import { watchProjects } from 'src/client/store/reducers/projects/projects.saga';
import { watchMergeRequests } from 'src/client/store/reducers/merge-requests/merge-requests.saga';

import {
  rootSaga,
  startSagas,
  watchSagas,
  watchSaga,
} from '../store.saga';
import { watchJiraIssues } from '../reducers/jira-issues/jira-issues.saga';
import { watchFetchProjectData } from '../reducers/project/project.saga';

jest.mock('redux-saga/effects');

describe('store.saga', () => {
  describe('rootSaga', () => {
    it('should execute start sagas', () => {
      const gen = rootSaga();

      gen.next();

      expect(spawn).toHaveBeenCalledWith(watchSaga);

      gen.next();

      map(startSagas, (saga) => {
        expect(fork).toHaveBeenCalledWith(saga);
      });
    });
  });

  describe('watchSaga', () => {
    it('should execute watchers', () => {
      watchSaga().next();

      map(watchSagas, (saga) => {
        expect(spawn).toHaveBeenCalledWith(saga);
      });
    });
  });

  describe('startSagas', () => {
    it('should contain start sagas', () => {
      const expected = [
        initI18n,
      ];

      expect(startSagas).toEqual(expected);
    });
  });

  describe('watchSagas', () => {
    it('should contain watch sagas', () => {
      const expected = [
        watchI18n,
        watchFetchProjectData,
        watchProjects,
        watchMergeRequests,
        watchJiraIssues,
      ];

      expect(watchSagas).toEqual(expected);
    });
  });
});
