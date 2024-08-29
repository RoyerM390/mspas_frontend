import React, {useEffect, useState, useSyncExternalStore} from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import {Button, Col, Modal, Tag} from 'antd';
import ModalRegistrarRol from './ModalRegistrarRol';
import {useDispatch} from 'react-redux';
import {api} from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import AppMenu from '@aqtiva/components/AppMenu';
import {AiOutlineEdit} from 'react-icons/ai';
import {FaTimes} from 'react-icons/fa';

const Roles = () => {
  const [modalRol, setModalRol] = useState(false);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState(null);
  const {get, genericPost} = api('roles', dispatch, setRoles, roles)

  useEffect(() => {
    get();
  }, []);

  return (
    <AppsContainer fullView title="Roles">
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col>
          <Button type="primary" ghost onClick={() => setModalRol(true)}>
            Registrar nuevo rol
          </Button>
        </Col>
      </AppRowContainer>
      <AppsPagination onChange={(page) => get('', page)} />
      <AppTableContainer data={roles} columns={
        [
          {
            key: 1,
            title: 'Nombre',
            dataIndex: 'nombre',
          },
          {
            key: 2,
            title: 'Permisos',
            dataIndex: 'permisos',
            render: (permisos) => permisos.map((permiso, idx) => <Tag key={idx} color='green'>{permiso}</Tag>)
          },
          {
            key: 3,
            title: 'Acciones',
            render: (item) => (
              <AppMenu
                options={[
                  {
                    label: 'Modificar',
                    icon: <AiOutlineEdit />,
                    disabled: item.nombre === 'ADMINISTRADOR',
                    onClick: () => {
                      setRol(item);
                      setModalRol(true)
                    }
                  },
                  {
                    label: 'Eliminar',
                    icon: <FaTimes />,
                    onClick: () => {
                      Modal.confirm({
                        title: 'Confirmar',
                        content: '¿Desea eliminar este rol?',
                        onOk: async () => {
                          await genericPost(`roles/eliminar/${item.id}`);
                          await get();
                        }
                      })
                    }
                  },
                ]}
              />
            ),
          },
        ]
      } />
      <ModalRegistrarRol open={modalRol} onCancel={() => {
        setModalRol(false);
        setRol(null)
      }} rol={rol} onOk={async () => {
        await get();
        setModalRol(false)
      }}/>
    </AppsContainer>
  );
};

export default Roles;
