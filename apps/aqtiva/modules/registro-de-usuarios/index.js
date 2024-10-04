import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { Button, Tag } from 'antd';
import { api } from '@aqtiva/helpers/api';
import { useDispatch } from 'react-redux';
import ModalRegistrarUsuario from './ModalRegistrarUsuario';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppMenu from '@aqtiva/components/AppMenu';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaUserAltSlash, FaUserCheck } from 'react-icons/fa';

const RegistroDeUsuarios = () => {
  const dispatch = useDispatch();
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [modalRegistrarUsuario, setModalRegistrarUsuario] = useState(false);
  const { genericGet, genericPost } = api('', dispatch);
  useEffect(() => {
    genericGet('auth', {}, setUsuarios);
  }, []);

  const actualizarEstado = async (usuarioId, estado) => {
    await genericPost(`usuarios/editar-estado/${usuarioId}`, { estado });
  };

  return (
    <AppsContainer
      fullView
      title={'Registro de Usuarios'}
      extra={[
        <Button
          key={1}
          ghost
          type={'primary'}
          onClick={() => setModalRegistrarUsuario(true)}
        >
          Registro de usuarios
        </Button>,
      ]}
    >
      <AppsPagination />
      <AppTableContainer
        columns={[
          {
            key: 0,
            title: 'Usuario',
            dataIndex: 'nickname',
          },
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
            title: 'Puesto',
            dataIndex: 'puesto',
          },
          {
            key: 4,
            title: 'Estado',
            dataIndex: 'estados_usuario',
            render: (estado) =>
              estado.id === 1 ? (
                <Tag color={'green'}>{estado.nombre}</Tag>
              ) : (
                <Tag color={'red'}>{estado.nombre}</Tag>
              ),
          },
          {
            key: 5,
            title: 'Acciones',
            render: (item) => (
              <AppMenu
                options={[
                  {
                    label: 'Modificar',
                    icon: <AiOutlineEdit />,
                    onClick: () => {
                      setUsuario(item);
                      setModalRegistrarUsuario(true);
                    },
                  },
                  {
                    label:
                      item.estados_usuario_id === 1 ? 'Desactivar' : 'Activar',
                    icon:
                      item.estados_usuario_id === 1 ? (
                        <FaUserAltSlash />
                      ) : (
                        <FaUserCheck />
                      ),
                    onClick: async () => {
                      await actualizarEstado(
                        item.id,
                        item.estados_usuario_id === 1 ? 2 : 1
                      );
                      await genericGet('auth', {}, setUsuarios);
                    },
                  },
                ]}
              />
            ),
          },
        ]}
        data={usuarios}
      />
      <ModalRegistrarUsuario
        registro={usuario}
        open={modalRegistrarUsuario}
        onCancel={() => setModalRegistrarUsuario(false)}
        onOk={async () => {
          await genericGet('auth');
          setModalRegistrarUsuario(false);
        }}
      />
    </AppsContainer>
  );
};

export default RegistroDeUsuarios;
