import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { Button, Form } from 'antd';
import ModalRegistrarConsulta from './ModalRegistrarConsulta';
import { getFormattedDate } from '@aqtiva/helpers';
import { FaRegEye } from 'react-icons/fa';

const ConsultasGenerales = () => {
  const dispatch = useDispatch();
  const { genericGet } = api('', dispatch);
  const [consultas, setConsultas] = useState([]);
  const [modalRegistrarConsulta, setModalRegistrarConsulta] = useState(false);
  useEffect(() => {
    genericGet('consultas-generales', {}, setConsultas);
  }, []);

  return (
    <AppsContainer
      fullView
      title={'Consulta general'}
      extra={[
        <Button
          key={1}
          ghost
          type={'primary'}
          onClick={() => setModalRegistrarConsulta(true)}
        >
          Registrar consulta
        </Button>,
      ]}
    >
      <AppsPagination />
      <AppTableContainer
        data={consultas}
        columns={[
          {
            title: 'CUI',
            dataIndex: 'cui',
          },
          {
            title: 'Nombres',
            dataIndex: 'nombres',
          },
          {
            title: 'Apellidos',
            dataIndex: 'apellidos',
          },
          {
            title: 'Fecha de consulta',
            render: ({ fecha, hora }) =>
              `${getFormattedDate(fecha)} ${getFormattedDate(hora, 'HH:mm')}`,
          },
          {
            title: 'Registrado por',
            dataIndex: 'usuarios',
            render: ({ nickname }) => nickname,
          },
          {
            title: 'Centro de salud',
            dataIndex: 'centros_de_salud',
            render: ({ nombre }) => nombre,
          },
          {
            title: 'Sector',
            dataIndex: 'sectores',
            render: ({ nombre }) => nombre,
          },
          {
            title: 'Ver detalles',
            render: () => (
              <Button
                size={'small'}
                type={'primary'}
                ghost
                icon={<FaRegEye />}
              />
            ),
          },
        ]}
      />
      <ModalRegistrarConsulta
        open={modalRegistrarConsulta}
        onCancel={() => setModalRegistrarConsulta(false)}
        onOk={async () => {
          await genericGet('consultas-generales', {}, setConsultas);
          setModalRegistrarConsulta(false);
        }}
      />
    </AppsContainer>
  );
};

export default ConsultasGenerales;
