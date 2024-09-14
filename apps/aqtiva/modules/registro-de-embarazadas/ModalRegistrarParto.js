import React from 'react';
import { Modal } from 'antd';

const ModalRegistrarParto = ({ onOk, onCancel, embarazada, open }) => {
  return (
    <Modal
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      open={open}
      width={800}
    ></Modal>
  );
};

export default ModalRegistrarParto;
