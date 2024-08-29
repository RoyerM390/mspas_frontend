import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { Button, Col, Tag } from 'antd';
import ModalRegistrarEmpleado from './ModalRegistrarEmpleado';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getColor } from '@aqtiva/helpers';
import AppMenu from '@aqtiva/components/AppMenu';
import { AiOutlineEdit, AiOutlineUserAdd } from 'react-icons/ai';
import ModalRegistrarUsario from './ModalRegistrarUsuario';
import ModalModificarUsario from './ModalModificarUsuario';

const Usuarios = () => {
  const dispatch = useDispatch();
  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const { get } = api('empleados', dispatch, setEmpleados, empleados);
  const [modalRegistrarEmpleado, setModalRegistrarEmpleado] = useState(false);
  const [modalRegistrarUsario, setModalRegistrarUsario] = useState(false);
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  useEffect(() => {
    get();
  }, []);

  return (
    <AppsContainer fullView title="Usuarios">
      <AppRowContainer style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        <Col>
          <Button
            type="primary"
            ghost
            onClick={() => setModalRegistrarEmpleado(true)}
          >
            Registrar empleado
          </Button>
        </Col>
      </AppRowContainer>
      <AppsPagination />
      <AppTableContainer
        data={empleados}
        columns={[
          {
            key: 1,
            title: 'Nombres',
            dataIndex: 'nombres',
          },
          {
            key: 2,
            title: 'Apellidos',
            dataIndex: 'apellidos',
          },
          {
            key: 3,
            title: 'Usuarios',
            dataIndex: 'usuarios',
            render: (usuarios) =>
              usuarios.map((usuarioItem, idx) => (
                <Tag
                  style={{ cursor: 'pointer' }}
                  key={idx}
                  color={getColor(usuarioItem.estados_usuario)}
                  onClick={() => {
                    setUsuario(usuarioItem);
                    setModalEditarUsuario(true);
                  }}
                >
                  {usuarioItem.nickname}
                </Tag>
              )),
          },
          {
            key: 4,
            title: 'Acciones',
            render: (item) => (
              <AppMenu
                options={[
                  {
                    label: 'Modificar',
                    icon: <AiOutlineEdit />,
                    onClick: () => {
                      setEmpleado(item);
                      setModalRegistrarEmpleado(true);
                    },
                  },
                  {
                    label: 'Registrar usuario',
                    icon: <AiOutlineUserAdd />,
                    onClick: () => {
                      setEmpleado(item);
                      setModalRegistrarUsario(true);
                    },
                  },
                ]}
              />
            ),
          },
        ]}
      />
      <ModalRegistrarEmpleado
        open={modalRegistrarEmpleado}
        onCancel={() => {
          setEmpleado(null);
          setModalRegistrarEmpleado(false);
        }}
        onOk={async () => {
          setEmpleado(null);
          await get();
          setModalRegistrarEmpleado(false);
        }}
        empleado={empleado}
      />
      <ModalRegistrarUsario
        empleado={empleado}
        open={modalRegistrarUsario}
        onOk={async () => {
          await get();
          setModalRegistrarUsario(false);
        }}
        onCancel={() => setModalRegistrarUsario(false)}
      />
      <ModalModificarUsario
        open={modalEditarUsuario}
        usuario={usuario}
        onCancel={() => setModalEditarUsuario(false)}
        onOk={async () => {
          await get();
          setModalEditarUsuario(false);
        }}
      />
    </AppsContainer>
  );
};

export default Usuarios;
