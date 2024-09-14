import React from 'react';
import { Modal } from 'antd';

const ModalRegistrarPosParto = ({ onOk, onCancel, open, embarazada }) => {
  return (
    <Modal
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      open={open}
      width={800}
    ></Modal>
  );
};

export default ModalRegistrarPosParto;
