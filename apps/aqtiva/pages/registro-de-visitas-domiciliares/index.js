import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const RegistroDeVisitas = asyncComponent(() =>
  import('../../modules/registro-de-visitas-domiciliares')
);
export default AppPage(() => <RegistroDeVisitas />);
