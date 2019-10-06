import React from 'react';

import './chip-group.scss';

const ChipGroup = (props) => {
  const output = (
    <div className="chip-group">
      {props.children}
    </div>
  );

  return output;
};

export default ChipGroup;
