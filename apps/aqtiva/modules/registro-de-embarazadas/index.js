import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { Button, Col, Input, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getFormattedDate } from '@aqtiva/helpers';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import ModalRegistrarMujeresEmbarazadas from './ModalRegistrarMujeresEmbarazadas';
import AppMenu from '@aqtiva/components/AppMenu';
import { AiOutlineEdit } from 'react-icons/ai';

import { IoEyeOutline } from 'react-icons/io5';
import ModalVerCitasPrenatales from './ModalVerCitasPrenatales';
import dayjs from 'dayjs';
import ModalRegistrarUltraSonido from './ModalRegistrarUltraSonido';
import { FaBaby } from 'react-icons/fa';
import ModalVerUltraSonidos from './ModalVerUltraSonidos';

const Registro = () => {
  const dispatch = useDispatch();
  const [mujeresEmbarazadas, setMujeresEmbarazadas] = useState([]);
  const [search, setSearch] = useState('');
  const [registro, setRegistro] = useState(null);
  const [modalVerVisitas, setModalVerVisitas] = useState(false);
  const [modalVerUltraSonidos, setModalVerUltraSonidos] = useState(false);
  const { get } = api(
    'embarazadas',
    dispatch,
    setMujeresEmbarazadas,
    mujeresEmbarazadas
  );
  const [modalRegistro, setModalRegistro] = useState(false);
  useEffect(() => {
    get();
  }, []);

  const columns = [
    {
      key: 1,
      title: 'CUI',
      dataIndex: 'cui',
    },
    {
      key: 2,
      title: 'Nombre',
      render: (item) => `${item.nombres} ${item.apellidos}`,
    },
    {
      key: 3,
      title: 'Fecha de nacimiento',
      render: (item) => getFormattedDate(item.fecha_nacimiento),
    },
    {
      key: 5,
      title: 'Ocupación',
      dataIndex: 'ocupacion',
    },
    {
      key: 6,
      title: 'telefono',
      dataIndex: 'telefono',
    },
    {
      key: 7,
      title: 'Dirección',
      dataIndex: 'direccion',
    },
    {
      key: 8,
      title: 'Fecha de parto prevista',
      dataIndex: 'fecha_parto',
      render: (fecha) => getFormattedDate(fecha),
    },
    {
      key: 9,
      title: 'Proxima cita',
      dataIndex: 'citas_prenatales',
      render: (citas) =>
        citas.length > 0 ? (
          <Tag
            color={
              dayjs(citas[0].fecha_proxima_cita).diff(dayjs(), 'day') <= 3
                ? 'red'
                : 'blue'
            }
          >
            {getFormattedDate(citas[0].fecha_proxima_cita)}
          </Tag>
        ) : null,
    },
    {
      key: 9,
      title: 'Acciones',
      render: (item) => (
        <AppMenu
          options={[
            {
              label: 'Modificar',
              icon: <AiOutlineEdit />,
              onClick: () => {
                setRegistro(item);
                setModalRegistro(true);
              },
            },
            {
              label: 'Ver visitas prenatales',
              icon: <IoEyeOutline />,
              onClick: () => {
                setRegistro(item);
                setModalVerVisitas(true);
              },
            },
            {
              label: 'Ver ultrasonidos',
              icon: <FaBaby />,
              onClick: () => {
                setRegistro(item);
                setModalVerUltraSonidos(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AppsContainer
      title="Registro de mujeres embarazadas"
      fullView
      extra={[
        <Button
          key={1}
          type="primary"
          ghost
          onClick={() => setModalRegistro(true)}
        >
          Registrar
        </Button>,
      ]}
    >
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={6}>
          <Input.Search
            placeholder="Nombre o CUI"
            onSearch={(value) => {
              setSearch(value);
              get(value);
            }}
          />
        </Col>
      </AppRowContainer>
      <AppsPagination onChange={(page) => get(search, page)} />
      <AppTableContainer columns={columns} data={mujeresEmbarazadas} />
      <ModalRegistrarMujeresEmbarazadas
        open={modalRegistro}
        onOk={async () => {
          setRegistro(null);
          await get(search);
          setModalRegistro(false);
        }}
        onCancel={() => {
          setModalRegistro(false);
          setRegistro(null);
        }}
        registro={registro}
      />

      <ModalVerCitasPrenatales
        embarazada={registro}
        onOk={async () => {
          await get(search);
          setModalVerVisitas(false);
        }}
        open={modalVerVisitas}
        onCancel={() => setModalVerVisitas(false)}
      />
      <ModalVerUltraSonidos
        open={modalVerUltraSonidos}
        onCancel={() => setModalVerUltraSonidos(false)}
        onOk={async () => {
          await get();
          setModalVerUltraSonidos(false);
        }}
        embarazada={registro}
      />
    </AppsContainer>
  );
};

export default Registro;
