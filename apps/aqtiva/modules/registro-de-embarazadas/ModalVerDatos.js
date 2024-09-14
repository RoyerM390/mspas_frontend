import React from 'react';
import { Modal } from 'antd';

const ModalVerDatos = ({ onOk, onCancel, open, embarazada }) => {
  return (
    <Modal
      width={1000}
      onOk={() => {
        onOk();
      }}
      onCancel={() => {
        onCancel();
      }}
      open={open}
    ></Modal>
  );
};

export default ModalVerDatos;
