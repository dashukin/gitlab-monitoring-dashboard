import React, { PureComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

class Header extends PureComponent {
  render() {
    const output = (
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Gitlab monitoring dashboard</Typography>
        </Toolbar>
      </AppBar>
    );

    return output;
  }
}

Header.propTypes = {

};

Header.defaultProps = {

};

export default Header;
