import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import { getFormattedDate } from '@aqtiva/helpers';

const ModalVerDatos = ({ onOk, onCancel, open, embarazada }) => {
  const [parto, setParto] = useState({});
  const [posParto, setPosParto] = useState({});
  useEffect(() => {
    if (embarazada?.parto_id) {
      setParto(embarazada.partos);
    }
    if (embarazada?.posparto_id) {
      setPosParto(embarazada.pos_partos);
    }
  }, [embarazada]);

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
      label: 'Enfermedades',
      children: embarazada?.embarazadas_enfermedades
        ?.map((enfermedad) => enfermedad.enfermedades.nombre)
        .join(', '),
    },
    {
      label: 'Otras enfermedades',
      children: embarazada?.otras_enfermedades,
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
      label: 'Centro de salud',
      children: embarazada?.centros_de_salud?.nombre,
    },
    {
      label: 'Sector',
      children: embarazada?.sectores?.nombre,
    },
    {
      label: 'Numero de casa',
      children: embarazada?.numero_de_casa,
    },
    {
      label: 'pueblo',
      children: embarazada?.pueblos?.nombre,
    },

    {
      label: 'Observaciones',
      children: embarazada?.observaciones,
    },
  ];

  const itemsParto = [
    {
      label: 'Fecha',
      children: getFormattedDate(parto.fecha),
    },
    {
      label: 'Hora',
      children: getFormattedDate(parto.hora, 'hh:mm a'),
    },
    {
      label: 'Peso',
      children: parto.peso,
    },
    {
      label: 'Num. de partos',
      children: parto.numero_de_partos,
    },
  ];

  const itemsPosParto = [
    {
      label: 'Fecha de atencion',
      children: getFormattedDate(posParto?.fecha_de_atencion),
    },
    {
      label: 'Nombres',
      children: posParto?.nombre_de_recien_nacido,
    },
    {
      label: 'Apellidos',
      children: posParto?.apellidos_de_recien_nacido,
    },
    {
      label: 'Fecha de nacimiento',
      children: getFormattedDate(posParto?.fecha_de_nacimiento),
    },
    {
      label: 'Descripcion',
      children: posParto?.descripcion,
    },
    {
      label: 'Estado de salud',
      children: posParto?.estado_de_salud,
    },
  ];
  return (
    <Modal
      title={'Datos de embarazada'}
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
        column={{ xs: 1, md: 1 }}
        bordered={true}
        items={items.map((item, i) => ({ key: i, ...item }))}
      />
      <Divider>Datos de parto</Divider>
      <Descriptions
        column={{ xs: 1, md: 2 }}
        bordered={true}
        items={itemsParto.map((item, i) => ({ key: i, ...item }))}
      />
      <Divider>Datos de Posparto</Divider>
      <Descriptions
        column={{ xs: 1, md: 2 }}
        bordered={true}
        items={itemsPosParto.map((item, i) => ({ key: i, ...item }))}
      />
    </Modal>
  );
};

export default ModalVerDatos;
