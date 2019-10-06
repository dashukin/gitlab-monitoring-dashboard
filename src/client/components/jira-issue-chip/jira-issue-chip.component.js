import React from 'react';
import PropTypes from 'prop-types';

import Chip from 'src/client/components/chip';
import Avatar from '@material-ui/core/Avatar';

const JiraIssueChip = (props) => {
  const { jiraIssue } = props;
  const label = `${jiraIssue.key} (${jiraIssue.status.name})`;
  const output = (
    <Chip
      avatar={
        <Avatar src={jiraIssue.issuetype.iconUrl} />
      }
      label={label}
      color="default"
      size="small"
    />
  );

  return output;
};

JiraIssueChip.propTypes = {
  jiraIssue: PropTypes.shape({}),
};

JiraIssueChip.defaultProps = {
  jiraIssue: {},
};

export default JiraIssueChip;
