import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Select } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';

const ModalModificarUsario = ({ open, onOk, onCancel, usuario }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ common }) => common);
  const [roles, setRoles] = useState([]);
  const { genericGet, genericPost } = api('', dispatch);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const resp = await genericGet('roles/all');
    setRoles(resp);
  };

  useEffect(() => {
    form.setFieldsValue({roles_id: usuario?.roles_id, estados_usuario_id: usuario?.estados_usuario_id})
  }, [usuario]);


  return (
    <Modal
      width={900}
      title="Editar usuario"
      open={open}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost(`usuarios/editar/${usuario?.id}`, values);
          onOk();
        } catch (e) {
          if (e.errorFields) {
            return Promise.reject();
          }
        }
      }}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label='Rol'
              name="roles_id"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Select
                allowClear
                style={{ width: '100%' }}
                options={roles.map((rol) => ({
                  label: rol.nombre,
                  value: rol.id,
                }))}
                defaultValue={usuario?.roles_id}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label='Estado'
              name="estados_usuario_id"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Select
                allowClear
                style={{ width: '100%' }}
                options={[
                  { label: 'ACTIVO', value: 1 },
                  { label: 'DESACTIVADO', value: 2 },
                ]}
                defaultValue={usuario?.estados_usuario_id}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label="Nueva contraseña"
              name="password"
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label="Confirmar contraseña"
              name="confirmar_password"
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'Los campos de contraseña no coinciden'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalModificarUsario;
