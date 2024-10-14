import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { Button, Col, Form, Input, Space } from 'antd';
import ModalRegistrarConsulta from './ModalRegistrarConsulta';
import { getFormattedDate } from '@aqtiva/helpers';
import { FaRegEye } from 'react-icons/fa';
import ModalVerDatos from './ModalVerDatos';
import { CiEdit } from 'react-icons/ci';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ConsultasGenerales = () => {
  const dispatch = useDispatch();
  const { genericGet } = api('', dispatch);
  const [consultas, setConsultas] = useState([]);
  const [modalVerDatos, setModalVerDatos] = useState(false);
  const [modalRegistrarConsulta, setModalRegistrarConsulta] = useState(false);
  const [registro, setRegistro] = useState(null);

  const getConsultas = (search = '') => {
    genericGet('consultas-generales', { search }, setConsultas);
  };
  useEffect(() => {
    getConsultas();
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
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={6}>
          <Input.Search
            placeholder="Nombre o CUI"
            onSearch={(value) => {
              getConsultas(value);
            }}
          />
        </Col>
      </AppRowContainer>
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
            render: (item) => item?.centros_de_salud?.nombre,
          },
          {
            title: 'Sector',
            render: (item) => item?.sectores?.nombre,
          },
          {
            title: 'Ver detalles',
            render: (item) => (
              <Space>
                <Button
                  size={'small'}
                  type={'primary'}
                  ghost
                  icon={<FaRegEye />}
                  onClick={() => {
                    setRegistro(item);
                    setModalVerDatos(true);
                  }}
                />
                <Button
                  size={'small'}
                  type={'primary'}
                  ghost
                  icon={<CiEdit />}
                  onClick={() => {
                    setRegistro(item);
                    setModalRegistrarConsulta(true);
                  }}
                />
              </Space>
            ),
          },
        ]}
      />
      <ModalRegistrarConsulta
        registro={registro}
        open={modalRegistrarConsulta}
        onCancel={() => {
          setModalRegistrarConsulta(false);
          setRegistro(null);
        }}
        onOk={async () => {
          await genericGet('consultas-generales', {}, setConsultas);
          setRegistro(null);
          setModalRegistrarConsulta(false);
        }}
      />
      <ModalVerDatos
        open={modalVerDatos}
        registro={registro}
        onOk={() => setModalVerDatos(false)}
        onCancel={() => setModalVerDatos(false)}
      />
    </AppsContainer>
  );
};

export default ConsultasGenerales;
