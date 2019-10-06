import React from 'react';
import PropTypes from 'prop-types';

import { Chip } from 'src/client/components/chip';

const JiraFixVersionChip = (props) => {
  const { jiraIssue } = props;
  const { fixVersions } = jiraIssue;

  if (!fixVersions.length) {
    return null;
  }

  const label = fixVersions
    .map(data => data.name)
    .join(', ');

  const output = (
    <Chip
      label={label}
      tooltip={label}
      color="default"
      size="small"
    />
  );

  return output;
};

JiraFixVersionChip.propTypes = {
  jiraIssue: PropTypes.shape({}),
};

JiraFixVersionChip.defaultProps = {
  jiraIssue: {},
};

export default JiraFixVersionChip;
