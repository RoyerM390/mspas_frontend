import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Pefil = asyncComponent(() => import('../../modules/mi-perfil'));
export default AppPage(() => <Pefil />);
