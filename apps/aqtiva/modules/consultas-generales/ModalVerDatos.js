import React from 'react';
import { Descriptions, Modal } from 'antd';
import { getFormattedDate } from '@aqtiva/helpers';

const ModalVerDatos = ({ open, onOk, onCancel, registro }) => {
  const items = [
    {
      label: 'Nombres',
      children: registro?.nombres,
    },
    {
      label: 'Apellidos',
      children: registro?.apellidos,
    },
    {
      label: 'Fecha de nacimiento',
      children: getFormattedDate(registro?.fecha_nacimiento),
    },
    {
      label: 'Centro comunitario',
      children: registro?.centros_de_salud?.nombre,
    },
    {
      label: 'Comunidad',
      children: registro?.sectores?.nombre,
    },
    {
      label: 'Pueblo',
      children: registro?.pueblos?.nombre,
    },
    {
      label: 'Motivo de consulta',
      children: registro?.motivo_consulta,
    },
    {
      label: 'Observaciones',
      children: registro?.observaciones,
    },
    {
      label: 'Medicamento',
      children: registro?.medicamento,
    },
    {
      label: 'Direccion',
      children: registro?.direccion,
    },
    {
      label: 'Telefono',
      children: registro?.telefono,
    },
    {
      label: 'Num. de casa',
      children: registro?.numero_de_casa,
    },
    {
      label: 'Migrante',
      children: registro?.migrante ? 'SI' : 'NO',
    },
    {
      label: 'Fecha de registro',
      children: `${getFormattedDate(registro?.fecha)} ${getFormattedDate(
        registro?.hora,
        'HH:mm'
      )}`,
    },
    {
      label: 'Registrado por',
      children: registro?.usuarios?.nickname,
    },
  ];
  return (
    <Modal width={'100vw'} onOk={onOk} onCancel={onCancel} open={open}>
      <Descriptions items={items} bordered={true} column={2} />
    </Modal>
  );
};

export default ModalVerDatos;
