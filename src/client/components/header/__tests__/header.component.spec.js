import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header.component';

describe('header', () => {
  describe('snapshots', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<Header />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
