import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppTableContainer from '@aqtiva/components/AppTableContainer';

const ModalVerCitasPrenatales = ({ open, onOk, onCancel, embarazada }) => {
  const dispatch = useDispatch();
  const [citasPrenatales, setCitasPrenatales] = useState([]);
  const { genericGet } = api('citas-prenatales', dispatch);

  useEffect(() => {
    if (open) {
      genericGet('citas-prenatales', {}, setCitasPrenatales);
    }
  }, [open, embarazada]);

  return (
    <Modal onOk={onOk} onCancel={onCancel} open={open} width={1000}>
      <AppTableContainer
        data={citasPrenatales}
        columns={[
          {
            title: 'Fecha cita',
          },
        ]}
      />
    </Modal>
  );
};

export default ModalVerCitasPrenatales;
