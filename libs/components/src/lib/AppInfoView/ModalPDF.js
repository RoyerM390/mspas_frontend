import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_PDF } from '@aqtiva/constants/ActionTypes';
import { StyledModalPdf } from './index.styled';

const ModalPdf = () => {
  const [dataPDF, setDataPDF] = useState(null);
  const { showPdf, blob } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    if (blob) {
      const blob_url = URL.createObjectURL(blob);
      setDataPDF(blob_url);
    }
  }, [blob]);

  return (
    <StyledModalPdf
      zIndex={10000}
      className="fullview-modal"
      forceRender={false}
      width={900}
      open={showPdf}
      cancelButtonProps={{ hidden: true }}
      onOk={() => dispatch({ type: HIDE_PDF, payload: null })}
      onCancel={() => dispatch({ type: HIDE_PDF, payload: null })}
    >
      {dataPDF && (
        <iframe
          title="PDF"
          src={dataPDF}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </StyledModalPdf>
  );
};

export default ModalPdf;
