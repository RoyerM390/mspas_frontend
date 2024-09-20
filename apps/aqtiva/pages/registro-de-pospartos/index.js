import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const RegistroPosPartos = asyncComponent(() =>
  import('../../modules/registro-de-pospartos')
);
export default AppPage(() => <RegistroPosPartos />);
