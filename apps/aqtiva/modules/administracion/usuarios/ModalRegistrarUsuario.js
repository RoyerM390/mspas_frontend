import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, Modal, Select } from 'antd';
import { api } from '@aqtiva/helpers/api';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ModalRegistrarUsario = ({ open, onOk, onCancel, empleado }) => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const { genericGet, genericPost } = api('roles', dispatch, setRoles, roles);
  const [form] = Form.useForm();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const resp = await genericGet('roles/all');
    setRoles(resp);
  };

  return (
    <Modal
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost(`auth/create`, {
            ...values,
            empleados_id: empleado.id,
          });
          form.resetFields();
          form.setFieldsValue({});
          onOk();
        } catch (e) {
          console.log(e);
          if (e.errorFields) {
            return Promise.reject();
          }
        }
      }}
      onCancel={onCancel}
      open={open}
      width={800}
      title="Registrar usuario"
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label="Nombre de usuario"
              name="nickname"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input
                style={{ width: '100%' }}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\s/g, ''))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label="Rol"
              name="roles_id"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Select
                style={{ width: '100%' }}
                options={roles.map((rol) => ({
                  label: rol.nombre,
                  value: rol.id,
                }))}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label="Confirmar contraseña"
              name="confirmar_password"
              rules={[
                { required: true, message: 'Campo requerido' },
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

export default ModalRegistrarUsario;
