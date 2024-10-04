import React, { useEffect } from 'react';
import { Col, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { api } from '@aqtiva/helpers/api';

const ModalRegistrarUsuario = ({ open, onOk, onCancel, registro }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { genericPost } = api('', dispatch);

  useEffect(() => {
    if (registro) {
      form.setFieldsValue({ ...registro });
    }
  }, [registro]);

  return (
    <Modal
      open={open}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost('auth/create', values);
          onOk();
          form.resetFields();
        } catch (e) {
          return Promise.reject(e);
        }
      }}
      onCancel={onCancel}
      width={'80vw'}
      title={registro ? 'Editar usuario' : 'Registrar usuario'}
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Nombres'}
              name={'nombres'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Apellidos'}
              name={'apellidos'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Puesto'}
              name={'puesto'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'Usuario'} name={'nickname'}>
              <Input
                disabled={registro && Object.keys(registro).length > 0}
                onInput={(e) =>
                  (e.target.value = e.target.value
                    .toUpperCase()
                    .replace(/\s/g, ''))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'password'} name={'password'}>
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarUsuario;
