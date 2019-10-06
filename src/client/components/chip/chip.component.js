import React from 'react';

import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import './chip.scss';

const CustomChip = (props) => {
  const { tooltip = '', ...rest } = props;
  const output = (
    <Tooltip
      title={tooltip}
    >
      <Chip
        {...rest}
        classes={{
          root: 'custom-chip',
          label: 'custom-chip__label',
        }}
      />
    </Tooltip>
  );

  return output;
};

export default CustomChip;
