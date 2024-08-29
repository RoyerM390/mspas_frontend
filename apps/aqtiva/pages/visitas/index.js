import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Visitas = asyncComponent(() => import('../../modules/visitas'));
export default AppPage(() => <Visitas />);
