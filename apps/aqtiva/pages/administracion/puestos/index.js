import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Puestos = asyncComponent(() => import('../../../modules/administracion/puestos'));
export default AppPage(() => <Puestos />);
