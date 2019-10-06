import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReactReduxProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { ServicesProvider } from './hocs/with-services';
import Application from './application.container';

class Root extends PureComponent {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { store, services, inlineScripts } = this.props;
    return (
      <Fragment>
        {Boolean(inlineScripts) && (
          // eslint-disable-next-line react/no-danger
          <script dangerouslySetInnerHTML={{ __html: inlineScripts }} />
        )}
        <ThemeProvider>
          <ReactReduxProvider store={store}>
            <ServicesProvider services={services}>
              <Application />
            </ServicesProvider>
          </ReactReduxProvider>
        </ThemeProvider>
      </Fragment>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  services: PropTypes.shape({}).isRequired,
  inlineScripts: PropTypes.string,
};

Root.defaultProps = {
  inlineScripts: '',
};

export default Root;
