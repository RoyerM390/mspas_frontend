import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const RepEmbarazadas = asyncComponent(() =>
  import('../../../modules/reportes/embarazadas')
);
export default AppPage(() => <RepEmbarazadas />);
