import React from 'react';
import PropTypes from 'prop-types';

import Chip from 'src/client/components/chip';

const GitlabFixVersionChip = (props) => {
  const { mergeRequest } = props;
  const { milestone } = mergeRequest;

  if (!milestone) {
    return null;
  }

  const label = milestone.title;

  const output = (
    <Chip
      label={label}
      color="default"
      size="small"
    />
  );

  return output;
};

GitlabFixVersionChip.propTypes = {
  mergeRequest: PropTypes.shape({}),
};

GitlabFixVersionChip.defaultProps = {
  mergeRequest: {},
};

export default GitlabFixVersionChip;
