import React from 'react';
import PropTypes from 'prop-types';
import { StyledPagination } from './index.styled';
import { useSelector } from 'react-redux';

const AppsPagination = ({ onChange, className }) => {
  const { pagination } = useSelector(({ common }) => common);
  return (
    <StyledPagination
      showSizeChanger={false}
      showQuickJumper={true}
      component="div"
      defaultCurrent={1}
      total={pagination?.total || 1}
      pageSize={pagination?.perPage || 1}
      className={className}
      defaultPageSize={20}
      page={pagination?.currentPage || 1}
      current={pagination?.currentPage || 1}
      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
      onChange={onChange}
      rowsPerPageOptions={[]}
    />
  );
};

export default AppsPagination;

AppsPagination.defaultProps = {
  className: '',
};

AppsPagination.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
};
