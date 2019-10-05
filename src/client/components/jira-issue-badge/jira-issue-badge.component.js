import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import './jira-issue-badge.scss';

const JiraIssueBadge = (props) => {
  const { jiraIssue } = props;
  const label = `${jiraIssue.key} ${jiraIssue.fields.status.name}`;
  const output = (
    <Chip
      classes={{
        root: 'jira-issue-badge',
        sizeSmall: 'jira-issue-badge--size-small',
      }}
      avatar={
        <Avatar src={jiraIssue.fields.issuetype.iconUrl} />
      }
      label={label}
      color="default"
      size="small"
    />
  );

  return output;
};

JiraIssueBadge.propTypes = {
  jiraIssue: PropTypes.shape({}),
};

JiraIssueBadge.defaultProps = {
  jiraIssue: {},
};

export default JiraIssueBadge;
