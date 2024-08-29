import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledAppSelect, StyledOption } from './index.styled';
import { get } from 'lodash';

const AppSelect = ({
  valueKey,
  menus,
  onChange,
  defaultValue,
  label,
  concatLabel,
  concatValue,
  showSearch,
  placeholder,
  onSearch,
  mode,
  style,
  filterOption = false,
  ...rest
}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  useEffect(() => {
    setSelectionType(defaultValue);
  }, [defaultValue]);

  const handleSelectionType = (value) => {
    setSelectionType(menus.filter((item) => item[valueKey] === value)[0]);
    if (onChange !== undefined) {
      onChange(value);
    }
    if (value === undefined || value === []) {
      if (onSearch) onSearch();
    }
  };

  const getContacLabel = (menu = selectionType) => {
    if (typeof concatLabel === 'string') {
      return get(menu, concatLabel) || '';
    } else {
      let concatenated = '';
      for (const item of concatLabel) {
        concatenated += ` ${get(menu, item)}`;
      }
      return concatenated;
    }
  };

  return (
    <StyledAppSelect
      {...rest}
      allowClear={true}
      filterOption={filterOption}
      showSearch={showSearch}
      value={selectionType && selectionType[valueKey]}
      defaultValue={selectionType && selectionType[valueKey]}
      onChange={handleSelectionType}
      placeholder={placeholder}
      onSearch={onSearch}
      style={style}
      // optionLabelProp="label"
    >
      {selectionType ? (
        <StyledOption
          label={get(selectionType, label)}
          value={selectionType[valueKey]}
        >
          {`${get(selectionType, label)} ${
            concatLabel ? getContacLabel() : ''
          }`}
        </StyledOption>
      ) : (
        menus.map((menu, index) => (
          <StyledOption
            key={index}
            label={get(menu, label)}
            value={menu[valueKey]}
          >
            {`${get(menu, label)} ${concatLabel ? getContacLabel(menu) : ''}`}
          </StyledOption>
        ))
      )}
    </StyledAppSelect>
  );
};

export default AppSelect;
AppSelect.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
};
AppSelect.defaultProps = {
  menus: [],
  showSearch: false,
};
