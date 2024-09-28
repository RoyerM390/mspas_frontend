import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Modal, Select } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';

const ModalRegistrarVisita = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ common }) => common);
  const [usuarios, setUsuarios] = useState([]);
  const { genericGet, genericPost } = api('', dispatch);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  const getUsuarios = async (search = '') => {
    genericGet('auth', { search }, setUsuarios);
  };
  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <Modal
      title={'Registrar visita'}
      open={open}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost('visitas-domiciliares', { ...values });
          form.resetFields();
          await onOk();
        } catch (e) {
          return Promise.reject(e);
        }
      }}
      onCancel={onCancel}
      width={'100vw'}
      confirmLoading={loading}
    >
      <Form form={form} autoComplete={'off'} layout={'vertical'}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'CUI'} name={'cui'}>
              <Input />
            </Form.Item>
          </Col>
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
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={4}>
            <Form.Item
              label={'Fecha de visita'}
              name={'fecha_de_visita'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={4}>
            <Form.Item label={'Telefono'} name={'telefono'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={16}>
            <Form.Item
              label={'Encargados'}
              name={'usuarios'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Select
                style={{ fontSize: '25px' }}
                mode="multiple"
                options={usuarios.map((usuario) => ({
                  value: usuario.id,
                  label: usuario.nickname,
                }))}
                onChange={(value) => setUsuariosSeleccionados(value)}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label={'Direccion'}
              name={'direccion'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label={'Observaciones'} name={'observaciones'}>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarVisita;
