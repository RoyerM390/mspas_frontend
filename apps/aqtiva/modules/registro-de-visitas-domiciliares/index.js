import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { Button, Col, DatePicker, Input, Tag } from 'antd';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import ModalRegistrarVisita from './ModalRegistrarVisita';
import { getFormattedDate } from '@aqtiva/helpers';
import dayjs from 'dayjs';

const RegistroDeVisitasDomiciliares = () => {
  const dispatch = useDispatch();
  const { genericGet } = api('', dispatch);
  const [visitas, setVisitas] = useState([]);
  const [search, setSearch] = useState('');
  const [modalRegistrarVisita, setModalRegistrarVisita] = useState(false);
  const get = async (search = '', fechaInicio = null, fechaFin = null) => {
    await genericGet(
      'visitas-domiciliares',
      { search, fechaInicio, fechaFin },
      setVisitas
    );
  };

  useEffect(() => {
    get();
  }, []);

  const generarColorTag = (fecha) => {
    const diferencia = dayjs(fecha).diff(
      dayjs().utc(true).startOf('date'),
      'day'
    );
    if (diferencia <= 2) return 'red';
    if (diferencia >= 3 && diferencia <= 14) return 'orange';
    if (diferencia >= 15) return 'green';
  };

  return (
    <AppsContainer
      fullView
      title={'Registro de visitas domiciliares'}
      extra={[
        <Button
          key={1}
          ghost
          type={'primary'}
          onClick={() => setModalRegistrarVisita(true)}
        >
          Registrar visita
        </Button>,
      ]}
    >
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={6}>
          <Input.Search
            placeholder="Nombre o CUI"
            onSearch={(value) => {
              get(value);
              setSearch(value);
            }}
          />
        </Col>
        <Col xs={6}>
          <DatePicker.RangePicker
            onChange={(value) =>
              get(
                search,
                value && value[0] && value[0]?.startOf('date').toDate(),
                value && value[1] && value[1]?.startOf('date').toDate()
              )
            }
          />
        </Col>
      </AppRowContainer>
      <AppsPagination />
      <AppTableContainer
        data={visitas}
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
            title: 'Telefono',
            dataIndex: 'telefono',
          },
          {
            title: 'Fecha de visita',
            dataIndex: 'fecha_de_visita',
            render: (fecha) => (
              <Tag color={generarColorTag(fecha)}>
                {getFormattedDate(fecha)}
              </Tag>
            ),
          },
          {
            title: 'Observaciones',
            dataIndex: 'observaciones',
          },
          {
            title: 'Encargados',
            dataIndex: 'visitas_encargados',
            render: (visitas) =>
              visitas?.map((visita, i) => (
                <Tag color={'blue'} key={i}>
                  {visita.usuarios.nickname}
                </Tag>
              )),
          },
        ]}
      />
      <ModalRegistrarVisita
        open={modalRegistrarVisita}
        onCancel={() => setModalRegistrarVisita(false)}
        onOk={async () => {
          await get();
          setModalRegistrarVisita(false);
        }}
      />
    </AppsContainer>
  );
};

export default RegistroDeVisitasDomiciliares;
