import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { Button, Col, Input, Modal, Space, Switch, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  FaBaby,
  FaCheckDouble,
  FaFileDownload,
  FaRegEye,
} from 'react-icons/fa';
import ModalVerUltraSonidos from './ModalVerUltraSonidos';
import { PiBaby } from 'react-icons/pi';
import { MdOutlineBabyChangingStation } from 'react-icons/md';
import ModalVerDatos from './ModalVerDatos';
import ModalRegistrarPosParto from './ModalRegistrarPosParto';
import ModalRegistrarParto from './ModalRegistrarParto';
import { CiEdit } from 'react-icons/ci';

const Registro = () => {
  const dispatch = useDispatch();
  const [mujeresEmbarazadas, setMujeresEmbarazadas] = useState([]);
  const [search, setSearch] = useState('');
  const [registro, setRegistro] = useState(null);
  const [modalVerVisitas, setModalVerVisitas] = useState(false);
  const [modalVerDatos, setModalVerDatos] = useState(false);
  const [modalPosParto, setModalPosParto] = useState(false);
  const [modalParto, setModalParto] = useState(false);
  const [modalVerUltraSonidos, setModalVerUltraSonidos] = useState(false);
  const [parto, setParto] = useState({});
  const [posParto, setPosParto] = useState({});
  const [incluirConclusos, setIncluirConclusos] = useState(false);
  const { genericGet, getFile, genericPost } = api(
    'embarazadas',
    dispatch,
    setMujeresEmbarazadas,
    mujeresEmbarazadas
  );
  const [modalRegistro, setModalRegistro] = useState(false);
  useEffect(() => {
    getEmbarazadas({ search });
  }, []);
  const { loading } = useSelector(({ common }) => common);

  const getEmbarazadas = async (params = {}) => {
    await genericGet('embarazadas', params, setMujeresEmbarazadas);
  };

  const generarColorTag = (fecha) => {
    const diferencia = dayjs(fecha).diff(
      dayjs().utc(true).startOf('date'),
      'day'
    );
    if (diferencia <= 2) return 'red';
    if (diferencia >= 3 && diferencia <= 14) return 'orange';
    if (diferencia >= 15) return 'green';
  };

  const columns = [
    {
      key: 1,
      title: 'CUI',
      dataIndex: 'cui',
    },
    {
      key: 5,
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      render: (fecha) => getFormattedDate(fecha),
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
          <Tag color={generarColorTag(citas[0].fecha_proxima_cita)}>
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
            {
              label: item.parto_id ? 'Editar parto' : 'Registrar parto',
              icon: <MdOutlineBabyChangingStation />,
              onClick: () => {
                setParto(item.partos);
                setRegistro(item);
                setModalParto(true);
              },
            },
            {
              label: item.posparto_id
                ? 'Editar posparto'
                : 'Registrar posparto',
              icon: <PiBaby />,
              onClick: () => {
                setPosParto(item.pos_partos);
                setRegistro(item);
                setModalPosParto(true);
              },
            },
            {
              label: item.visitas_concluidas
                ? 'Habilitar visitas'
                : 'Concluir visitas',
              icon: <FaCheckDouble />,
              onClick: async () => {
                await modalConcluirVisitas(item.id, item.visitas_concluidas);
              },
            },
          ]}
        />
      ),
    },
  ];

  const modalConcluirVisitas = async (id, valorActual) => {
    if (!valorActual) {
      Modal.confirm({
        title: '¿Concluir visitas?',
        content: 'Se registrará como visitas concluidas',
        onOk: async () => {
          await genericPost(`embarazadas/registrar-como-concluida/${id}`, {
            concluida: !valorActual,
          });
          await getEmbarazadas({ incluirConclusos });
        },
      });
    } else {
      Modal.confirm({
        title: '¿Habilitar nuevamente?',
        content: 'Se registrará como visitas NO concluidas',
        onOk: async () => {
          await genericPost(`embarazadas/registrar-como-concluida/${id}`, {
            concluida: !valorActual,
          });
          await getEmbarazadas({ incluirConclusos });
        },
      });
    }
  };

  return (
    <AppsContainer
      title="Registro de mujeres embarazadas"
      fullView
      extra={[
        <Space key={0}>
          <Button
            key={1}
            type="primary"
            ghost
            onClick={() => setModalRegistro(true)}
          >
            Registrar
          </Button>
          <Button
            key={2}
            type="primary"
            ghost
            icon={<FaFileDownload />}
            loading={loading}
            onClick={async () => {
              await getFile(
                '/reportes/embarazadas-excel',
                {},
                'embarazadas.xlsx'
              );
            }}
          >
            Descargar
          </Button>
        </Space>,
      ]}
    >
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={6}>
          <Input.Search
            placeholder="Nombre o CUI"
            onSearch={(value) => {
              setSearch(value);
              getEmbarazadas({ search: value, incluirConclusos });
            }}
          />
        </Col>
        <Col>
          <Switch
            checkedChildren={'Incluir concluidas'}
            onChange={(value) => {
              setIncluirConclusos(value);
              getEmbarazadas({ search, incluirConclusos: value });
            }}
          />
        </Col>
      </AppRowContainer>
      <AppsPagination onChange={(page) => getEmbarazadas({ search, page })} />
      <AppTableContainer
        columns={columns}
        data={mujeresEmbarazadas}
        style={{ paddingBottom: '5rem' }}
      />
      <ModalRegistrarMujeresEmbarazadas
        open={modalRegistro}
        onOk={async () => {
          setRegistro(null);
          await getEmbarazadas({ search });
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
          await getEmbarazadas({ search });
          setModalVerVisitas(false);
        }}
        open={modalVerVisitas}
        onCancel={() => setModalVerVisitas(false)}
      />
      <ModalVerUltraSonidos
        open={modalVerUltraSonidos}
        onCancel={() => setModalVerUltraSonidos(false)}
        onOk={async () => {
          await getEmbarazadas();
          setModalVerUltraSonidos(false);
        }}
        embarazada={registro}
      />
      <ModalVerDatos
        open={modalVerDatos}
        embarazada={registro}
        onOk={() => setModalVerDatos(false)}
        onCancel={() => setModalVerDatos(false)}
      />
      <ModalRegistrarPosParto
        posparto={posParto}
        open={modalPosParto}
        embarazada={registro}
        onOk={async () => {
          await getEmbarazadas();
          setModalPosParto(false);
        }}
        onCancel={() => setModalPosParto(false)}
      />
      <ModalRegistrarParto
        parto={parto}
        embarazada={registro}
        open={modalParto}
        onOk={async () => {
          await getEmbarazadas();
          setModalParto(false);
        }}
        onCancel={() => setModalParto(false)}
      />
    </AppsContainer>
  );
};

export default Registro;
