import React from 'react';
import CurrencyFormat from 'react-currency-format';

const AppCurrency = ({ valor, ...rest }) => {
  return (
    <CurrencyFormat
      value={valor}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'Q '}
      {...rest}
    />
  );
};

export default AppCurrency;
