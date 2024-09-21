import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const ConsultasGenerales = asyncComponent(() =>
  import('../../modules/consultas-generales')
);
export default AppPage(() => <ConsultasGenerales />);
