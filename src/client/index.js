import React from 'react';
import { hydrate } from 'react-dom';
import { ROOT_ELEMENT_ID } from 'config/application';
import get from 'lodash/get';

import { createAppStore } from 'src/client/store/store';
import { createClientServices } from 'src/common/services';
import { createClientHistory } from 'src/common/history';

import inlineScripts from 'src/client/inline-scripts/compiled/inline-scripts';

import Root from './root.component';

export const createApp = ({ store, services }) => {
  const app = (
    <Root
      store={store}
      services={services}
      inlineScripts={inlineScripts}
    />
  );

  return app;
};

export const startApplication = async () => {
  const preloadedState = get(window, '__PRELOADED_STATE__', {});
  const services = createClientServices({
    location: window.location,
    cookie: document.cookie,
  });
  const history = createClientHistory();

  const appStore = await createAppStore({
    services,
    initialState: preloadedState,
    history,
  });
  const app = createApp({ store: appStore, services });

  hydrate(app, document.getElementById(ROOT_ELEMENT_ID));
};

if (typeof window !== 'undefined') {
  startApplication();
}
