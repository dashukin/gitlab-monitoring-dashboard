/**
 * History
 * @see https://github.com/ReactTraining/history
 */

import { createBrowserHistory, createMemoryHistory } from 'history';

const historyConfig = {
  baseName: '',
  forceRefresh: false,
};

export const createClientHistory = () => createBrowserHistory(historyConfig);

export const createServerHistory = ({ path }) => {
  const history = createMemoryHistory({
    ...historyConfig,
    initialEntries: [path],
  });

  return history;
};
