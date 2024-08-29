import React from 'react';
import appAsyncComponent from '../AppAsyncComponent';
import ModalPdf from './ModalPDF';

const AppInfoViewContext = appAsyncComponent(() => import('./ContextView'));
const AppInfoViewRedux = appAsyncComponent(() => import('./ReduxView'));

export const AppInfoView = () => {
  if (process.env.NX_STATE_TYPE === 'context') {
    return <AppInfoViewContext />;
  }
  return (
    <>
      <ModalPdf />
      <AppInfoViewRedux />
    </>
  );
  // return <AppInfoViewContext />;
};

export default AppInfoView;
