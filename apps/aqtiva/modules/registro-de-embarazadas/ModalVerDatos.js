import React from 'react';
import { Descriptions, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import { getFormattedDate } from '@aqtiva/helpers';

const ModalVerDatos = ({ onOk, onCancel, open, embarazada }) => {
  const items = [
    {
      label: 'CUI',
      children: embarazada?.cui,
    },
    {
      label: 'Nombres',
      children: embarazada?.nombres,
    },
    {
      label: 'Apellidos',
      children: embarazada?.apellidos,
    },
    {
      label: 'Edad',
      children: `${dayjs()
        .utc(true)
        .diff(dayjs(embarazada?.fecha_nacimiento).utc(false), 'years')} años`,
    },
    {
      label: 'Ocupacion',
      children: embarazada?.ocupacion,
    },
    {
      label: 'Telefono',
      children: embarazada?.telefono,
    },
    {
      label: 'Direccion',
      children: embarazada?.direccion,
    },
    {
      label: 'Observaciones',
      children: embarazada?.observaciones,
    },
    {
      label: 'Enfermedades',
      children: embarazada?.enfermedades,
    },
    {
      label: 'Otras enfermedades',
      children: embarazada?.enfermedades?.map(
        (enfermedad) => enfermedad.nombre
      ),
    },
    {
      label: 'Fecha probable de parto',
      children: getFormattedDate(embarazada?.fecha_parto),
    },
    {
      label: 'Fecha ultima regla',
      children: getFormattedDate(embarazada?.fecha_ultima_regla),
    },
    {
      label: 'Gestas',
      children: embarazada?.gestas,
    },
    {
      label: 'PES',
      children: embarazada?.pes,
    },
    {
      label: 'Cesarea',
      children: embarazada?.cesarea,
    },
    {
      label: 'HM',
      children: embarazada?.hm,
    },
    {
      label: 'HV',
      children: embarazada?.hv,
    },
    {
      label: 'AB',
      children: embarazada?.ab,
    },
    {
      label: 'Comunidad',
      children: embarazada?.comunidades?.nombre,
    },
    {
      label: 'Gestas',
      children: embarazada?.gestas,
    },
    {
      label: 'Numero de casa',
      children: embarazada?.numero_de_casa,
    },
    {
      label: 'Servicio de salud',
      children: embarazada?.servicio_de_salud,
    },
    {
      label: 'pueblo',
      children: embarazada?.pueblo?.nombre,
    },
  ];

  const itemsPosParto = [
    {

    }
  ]
  return (
    <Modal
      width={1400}
      onOk={() => {
        onOk();
      }}
      onCancel={() => {
        onCancel();
      }}
      open={open}
    >
      <Descriptions
        bordered={true}
        items={items.map((item, i) => ({ key: i, ...item }))}
      />
      <Divider>Datos de parto</Divider>
    </Modal>
  );
};

export default ModalVerDatos;
