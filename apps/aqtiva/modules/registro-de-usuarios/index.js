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

const RegistroDeUsuarios = () => {
  const dispatch = useDispatch();
  const [usuarios, setUsuarios] = useState([]);
  const [modalRegistrarUsuario, setModalRegistrarUsuario] = useState(false);
  const { genericGet } = api('', dispatch);
  useEffect(() => {
    genericGet('auth', {}, setUsuarios);
  }, []);

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
            render: () => (
              <AppMenu
                options={[
                  {
                    label: 'Modificar',
                    icon: <AiOutlineEdit />,
                  },
                  {
                    label: 'Desactivar',
                    icon: <AiOutlineEdit />,
                  },
                ]}
              />
            ),
          },
        ]}
        data={usuarios}
      />
      <ModalRegistrarUsuario
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
