/*
* Reducer
* */

import pageConstants from './page.constants';

export const defaultState = 'HOME';

// TODO: reconsider string constant usage
const page = (state = defaultState, action) => {
  const pageType = pageConstants[action.type] || state;

  return pageType;
};

export default page;
