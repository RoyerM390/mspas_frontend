import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { StyledQueueAnim } from './index.styled';
import { useSelector } from 'react-redux';

const AppTableContainer = (props) => {
  const { columns, data, pagination, hoverColor, className, ...rest } = props;
  const { loading } = useSelector(({ common }) => common);
  return (
    <StyledQueueAnim
      size="small"
      loading={loading}
      className={clsx({ hoverColor: hoverColor }, className)}
      columns={columns}
      dataSource={data?.map((dat, i) => ({ ...dat, key: i }))}
      rowKey="id"
      pagination={pagination}
      {...rest}
    />
  );
};

export default AppTableContainer;

AppTableContainer.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.array,
  className: PropTypes.string,
  pagination: PropTypes.bool,
  hoverColor: PropTypes.bool,
};

AppTableContainer.defaultProps = {
  pagination: false,
};
