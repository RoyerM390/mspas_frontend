import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Roles = asyncComponent(() => import('../../../modules/administracion/roles'));
export default AppPage(() => <Roles />);
