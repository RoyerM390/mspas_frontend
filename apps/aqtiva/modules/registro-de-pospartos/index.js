import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { Button, Col, Input, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { api } from '@aqtiva/helpers/api';
import { getFormattedDate } from '@aqtiva/helpers';
import AppMenu from '@aqtiva/components/AppMenu';
import { FaBaby, FaRegEye } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineBabyChangingStation } from 'react-icons/md';
import { PiBaby } from 'react-icons/pi';
import ModalRegistrarSoloPosparto from './ModalRegistrarSoloPosparto';
import ModalVerDatos from './ModalVerDatos';

const RegistroDePosPartos = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [modalRegistro, setModalRegistro] = useState(false);
  const { genericGet } = api('', dispatch);
  const [registro, setRegistro] = useState(null);
  const [modalVerDatos, setModalVerDatos] = useState(false);
  const [posPartos, setPosPartos] = useState([]);
  const get = async (page = 1) => {
    genericGet('embarazadas/solo-posparto', { search, page }, setPosPartos);
  };

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
      key: 9,
      title: 'Acciones',
      render: (item) => (
        <AppMenu
          options={[
            {
              label: 'Ver datos',
              icon: <FaRegEye />,
              onClick: () => {
                setRegistro(item);
                setModalVerDatos(true);
              },
            },
            {
              label: 'Modificar',
              icon: <AiOutlineEdit />,
              onClick: () => {
                setRegistro(item);
                setModalRegistro(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AppsContainer
      fullView
      title={'Registro de pospartos'}
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
      <AppTableContainer columns={columns} data={posPartos} />
      <ModalRegistrarSoloPosparto
        open={modalRegistro}
        onOk={async () => {
          await get();
          setModalRegistro(false);
        }}
        onCancel={() => setModalRegistro(false)}
        registro={registro}
      />
      <ModalVerDatos
        open={modalVerDatos}
        onOk={() => setModalVerDatos(false)}
        onCancel={() => setModalVerDatos(false)}
        embarazada={registro}
      />
    </AppsContainer>
  );
};

export default RegistroDePosPartos;
