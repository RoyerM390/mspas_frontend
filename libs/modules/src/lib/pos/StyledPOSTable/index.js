import React from 'react';
import PropTypes from 'prop-types';

import { StyledRecentPatientTable } from './index.styled';

const StyledPOSTable = ({ data, columns, ...rest }) => {
  const { style } = rest;
  return (
    <StyledRecentPatientTable
      hoverColor
      data={data}
      columns={columns}
      style={style}
    />
  );
};

export default StyledPOSTable;

StyledPOSTable.defaultProps = {
  data: [],
};

StyledPOSTable.propTypes = {
  data: PropTypes.array,
};
