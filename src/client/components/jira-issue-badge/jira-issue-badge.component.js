import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

const JiraIssueBadge = (props) => {
  const output = (
    <Chip
      label={props.label}
      color="primary"
    />
  );

  return output;
};

JiraIssueBadge.propTypes = {
  label: PropTypes.string,
};

JiraIssueBadge.propTypes = {
  label: PropTypes.string,
};

export default JiraIssueBadge;
