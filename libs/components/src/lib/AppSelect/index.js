import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledAppSelect, StyledOption } from './index.styled';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

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
  style,
  filterOption = false,
  allowClear = true,
  ...rest
}) => {
  const [selectionType, setSelectionType] = useState(
    Array.isArray(defaultValue)
      ? defaultValue.map((val) => val[valueKey])
      : defaultValue
  );
  const { loading } = useSelector(({ common }) => common);

  useEffect(() => {
    setSelectionType(
      Array.isArray(defaultValue)
        ? defaultValue.map((val) => val[valueKey])
        : defaultValue
    );
  }, [defaultValue]);

  const handleSelectionType = (value) => {
    let option = null;
    if (Array.isArray(defaultValue) || Array.isArray(value)) {
      option = menus
        .filter((item) => value.includes(+item[valueKey]))
        .map((menu) => menu[valueKey]);
    } else {
      option = menus.filter((item) => item[valueKey] === value)[0];
    }
    setSelectionType(option);
    if (onChange !== undefined) {
      onChange(value, option);
    }
    if (value === undefined) {
      if (onSearch) onSearch();
    }
  };

  const getContacLabel = (menu = selectionType) => {
    if (typeof concatLabel === 'string') {
      return get(menu, concatLabel);
    } else {
      let concatenated = '';
      for (const item of concatLabel) {
        concatenated += ` ${get(menu, item) || item}`;
      }
      return concatenated;
    }
  };

  return (
    <StyledAppSelect
      {...rest}
      loading={loading}
      allowClear={allowClear}
      filterOption={filterOption}
      showSearch={showSearch}
      value={
        Array.isArray(selectionType)
          ? selectionType
          : selectionType
          ? selectionType[valueKey]
          : null
      }
      defaultValue={
        Array.isArray(selectionType)
          ? selectionType
          : selectionType
          ? selectionType[valueKey]
          : null
      }
      onChange={handleSelectionType}
      placeholder={placeholder}
      onSearch={onSearch}
      style={style}
      // optionLabelProp="label"
    >
      {/*{selectionType ? (*/}
      {/*  <StyledOption*/}
      {/*    label={get(selectionType, label)}*/}
      {/*    value={selectionType[valueKey]}*/}
      {/*  >*/}
      {/*    {`${get(selectionType, label)} ${*/}
      {/*      concatLabel ? getContacLabel() : ''*/}
      {/*    }`}*/}
      {/*  </StyledOption>*/}
      {/*) : ( */}
      {/*  menus.map((menu, index) => (*/}
      {/*    <StyledOption*/}
      {/*      key={index}*/}
      {/*      label={get(menu, label)}*/}
      {/*      value={menu[valueKey]}*/}
      {/*    >*/}
      {/*      {`${get(menu, label)} ${concatLabel ? getContacLabel(menu) : ''}`}*/}
      {/*    </StyledOption>*/}
      {/*  ))*/}
      {/*)}*/}
      {menus.map((menu, index) => (
        <StyledOption
          key={index}
          label={get(menu, label) || label}
          value={menu[valueKey]}
        >
          {`${get(menu, label) || label} ${
            concatLabel ? getContacLabel(menu) : ''
          }`}
        </StyledOption>
      ))}
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
