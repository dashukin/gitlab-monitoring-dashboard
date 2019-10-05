import { extractMergeRequestIssues } from '../schema.helpers';

describe('schema.helper', () => {
  describe('extractMergeRequestIssues', () => {
    const expectations = [{
      title: '[ABC-123]',
      issues: ['ABC-123'],
    }, {
      title: '[ABC-123][DEF-456]',
      issues: ['ABC-123', 'DEF-456'],
    }, {
      title: '[ABC-123]Merge request title',
      issues: ['ABC-123'],
    }, {
      title: '[ABC-123] [DEF-456] Merge request title',
      issues: ['ABC-123', 'DEF-456'],
    }, {
      title: '[ABC-123] [FE] Merge request title',
      issues: ['ABC-123'],
    }];

    expectations.forEach(({ title, issues }) => {
      it(`should return ${issues} from ${title}`, () => {
        const parsedIssues = extractMergeRequestIssues(title);
        expect(parsedIssues).toEqual(issues);
      });
    });
  });
});
