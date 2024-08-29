import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Registro = asyncComponent(() => import('../../modules/registro'));
export default AppPage(() => <Registro />);
