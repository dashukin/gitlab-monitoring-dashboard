import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import JiraIssueChip from 'src/client/components/jira-issue-chip';
import { ChipGroup } from 'src/client/components/chip';
import JiraFixVersionChip from 'src/client/components/jira-fix-version-chip';
import GitlabFixVersionChip from 'src/client/components/gitlab-fix-version-chip';
import TimeAgo from 'react-timeago';

import './project-merge-requests.scss';

import map from 'lodash/map';

const baseClassname = 'project-mrs';
const classnames = {
  table: `${baseClassname}__table`,
  cell: `${baseClassname}__cell`,
};

class ProjectMergeRequests extends PureComponent {
  getMergeRequestsHead() {
    const output = (
      <TableHead>
        <TableRow>
          <TableCell variant="head">
            Details
          </TableCell>
          <TableCell variant="head">
            Created
          </TableCell>
          <TableCell variant="head">
            Upvotes
          </TableCell>
          <TableCell variant="head">
            Milestone
          </TableCell>
          <TableCell variant="head">
            Jira ID
          </TableCell>
          <TableCell variant="head">
            Jira f/v
          </TableCell>
        </TableRow>
      </TableHead>
    );

    return output;
  }

  getMergeRequestJiraIssues(jiraIssues) {
    const jiraIssuesChips = jiraIssues.map(jiraIssue => (
      <JiraIssueChip
        key={jiraIssue.key}
        jiraIssue={jiraIssue}
      />
    ));

    const output = (
      <ChipGroup>
        {jiraIssuesChips}
      </ChipGroup>
    );

    return output;
  }

  getMergeRequestJiraFixVersions(jiraIssues) {
    const fixVersionsChips = jiraIssues.map(jiraIssue => (
      <JiraFixVersionChip
        key={jiraIssue.key}
        jiraIssue={jiraIssue}
      />
    ));

    const output = (
      <ChipGroup>
        {fixVersionsChips}
      </ChipGroup>
    );

    return output;
  }

  getMergeRequestsBody() {
    const {
      mergeRequests,
    } = this.props;
    const rows = map(mergeRequests, (data) => {
      const { mergeRequest: mr, jiraIssues, mergeRequestThumbsup } = data;
      const jiraIssuesIds = this.getMergeRequestJiraIssues(jiraIssues);
      const jiraFixVersions = this.getMergeRequestJiraFixVersions(jiraIssues);
      const mrThumbsupTooltip = mergeRequestThumbsup.map(awardEmoji => awardEmoji.user.username).join(', ');
      const mrLabels = mr.labels.length ? `Labels:  ${mr.labels.join(', ')}` : null;

      const mergeRequestRow = (
        <TableRow key={mr.id}>
          <TableCell>
            <Tooltip title={mr.description} interactive>
              <Fragment>
                <Typography variant="body1">{mr.title}</Typography>
                <Typography variant="body2">
                  {mrLabels}
                </Typography>
                <Typography variant="caption">
                  {`Author:  ${mr.author.username}`}
                </Typography>
              </Fragment>
            </Tooltip>
          </TableCell>
          <TableCell className={classnames.cell}>
            <TimeAgo date={mr.createdAt} />
          </TableCell>
          <TableCell>
            <Tooltip title={mrThumbsupTooltip}>
              <Badge badgeContent={mr.upvotes} max={10}>
                <ThumbUp fontSize="small" />
              </Badge>
            </Tooltip>
          </TableCell>
          <TableCell>
            <GitlabFixVersionChip
              mergeRequest={mr}
            />
          </TableCell>
          <TableCell>
            {jiraIssuesIds}
          </TableCell>
          <TableCell>
            {jiraFixVersions}
          </TableCell>
        </TableRow>
      );

      return mergeRequestRow;
    });

    const output = (
      <TableBody>
        {rows}
      </TableBody>
    );

    return output;
  }

  getMergeRequests() {
    const mergeRequestsHead = this.getMergeRequestsHead();
    const mergeRequestsBody = this.getMergeRequestsBody();
    const output = (
      <div>
        <Paper>
          <Table>
            {mergeRequestsHead}
            {mergeRequestsBody}
          </Table>
        </Paper>
      </div>
    );

    return output;
  }

  getloadingOutput() {
    return 'loading';
  }

  getRenderingOutput() {
    const { loading } = this.props;
    const output = loading ? this.getloadingOutput() : this.getMergeRequests();
    return output;
  }

  render() {
    const output = this.getRenderingOutput();

    return output;
  }
}

ProjectMergeRequests.propTypes = {
  mergeRequests: PropTypes.arrayOf(PropTypes.shape({})),
  mergeRequestsThumbsup: PropTypes.shape({}),
  loading: PropTypes.bool,
};

ProjectMergeRequests.defaultProps = {
  mergeRequests: [],
  mergeRequestsThumbsup: {},
  loading: false,
};

export default ProjectMergeRequests;
