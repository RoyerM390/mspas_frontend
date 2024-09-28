import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const RegistroDeUsuarios = asyncComponent(() =>
  import('../../modules/registro-de-usuarios')
);
export default AppPage(() => <RegistroDeUsuarios />);
