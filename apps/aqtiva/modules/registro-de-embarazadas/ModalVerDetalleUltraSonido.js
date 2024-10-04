import React from 'react';
import { Descriptions, Modal } from 'antd';
import { getFormattedDate } from '@aqtiva/helpers';

const ModalVerUltraSonido = ({ open, onOk, onCancel, ultrasonido }) => {
  const items = [
    {
      key: '1',
      label: 'Lugar',
      children: ultrasonido?.lugar,
    },
    {
      key: '2',
      label: 'Fecha',
      children: getFormattedDate(ultrasonido?.fecha),
    },
    {
      key: '3',
      label: 'BA',
      children: ultrasonido?.ba,
    },
    {
      key: '4',
      label: 'Peso',
      children: ultrasonido?.peso,
    },
    {
      key: '5',
      label: 'Placenta',
      children: ultrasonido?.placenta,
    },
    {
      key: '6',
      label: 'FCF',
      children: ultrasonido?.fcf,
    },
    {
      key: '7',
      label: 'Pre-fetal',
      children: ultrasonido?.pre_fetal,
    },
    {
      key: '8',
      label: 'Edad de gestacion',
      children: ultrasonido?.edad_gestacion,
    },
    {
      key: '9',
      label: 'FPP',
      children: ultrasonido?.fpp,
    },
    {
      key: '10',
      label: 'PBF',
      children: ultrasonido?.pbf,
    },
    {
      key: '11',
      label: 'Comentarios',
      children: ultrasonido?.comentarios,
    },
  ];
  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      open={open}
      width={'50vw'}
      cancelButtonProps={{ hidden: true }}
    >
      <Descriptions bordered={true} items={items} column={2} />
    </Modal>
  );
};

export default ModalVerUltraSonido;
