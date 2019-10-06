import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import JiraIssueBadge from 'src/client/components/jira-issue-chip';
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
            ID
          </TableCell>
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
    const output = jiraIssues.map((jiraIssue) => {
      const jiraIssueIdOutput = (
        <div key={jiraIssue.key}>
          <JiraIssueBadge
            jiraIssue={jiraIssue}
          />
        </div>
      );

      return jiraIssueIdOutput;
    });

    return output;
  }

  getMergeRequestJiraFixVersions(jiraIssues) {
    const output = jiraIssues.map((jiraIssue) => {
      const jiraIssueIdOutput = (
        <div key={jiraIssue.key}>
          <JiraFixVersionChip
            jiraIssue={jiraIssue}
          />
        </div>
      );

      return jiraIssueIdOutput;
    });

    return output;
  }

  getMergeRequestsBody() {
    const { mergeRequests } = this.props;
    const rows = map(mergeRequests, (mr) => {
      const jiraIssuesIds = this.getMergeRequestJiraIssues(mr.jiraIssues);
      const jiraFixVersions = this.getMergeRequestJiraFixVersions(mr.jiraIssues);

      const mergeRequestRow = (
        <TableRow key={mr.id}>
          <TableCell>{mr.id}</TableCell>
          <TableCell>
            <div>{mr.title}</div>
            <div>{mr.description}</div>
          </TableCell>
          <TableCell className={classnames.cell}>
            <TimeAgo date={mr.createdAt} />
          </TableCell>
          <TableCell>
            <Badge badgeContent={mr.upvotes} max={10}>
              <ThumbUp fontSize="small" />
            </Badge>
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
  loading: PropTypes.bool,
};

ProjectMergeRequests.defaultProps = {
  mergeRequests: [],
  loading: false,
};

export default ProjectMergeRequests;
