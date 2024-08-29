import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Usuarios = asyncComponent(() => import('../../../modules/administracion/usuarios'));
export default AppPage(() => <Usuarios />);
