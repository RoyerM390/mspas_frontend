import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@aqtiva/components/AppAsyncComponent';

const Inicio = asyncComponent(() => import('../../modules/inicio'));
export default AppPage(() => <Inicio />);

// export async function getServerSideProps() {
//   return { props: {} };
// }
