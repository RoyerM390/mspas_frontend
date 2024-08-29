import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Modal } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppSelect from '@aqtiva/components/AppSelect';

const ModalRegistrarEmpleado = ({ open, onOk, onCancel, empleado }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ common }) => common);
  const [puestos, setPuestos] = useState([]);
  const { genericGet, genericPost } = api('', dispatch);

  useEffect(() => {
    genericGet('puestos', {}, setPuestos);
  }, []);

  useEffect(() => {
    if (empleado) {
      form.setFieldsValue({
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        puestos_id: empleado.puestos_id,
      });
    }
  }, [empleado]);

  return (
    <Modal
      title="Registrar empleado"
      width="100vw"
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (empleado) {
            await genericPost(`empleados/editar/${empleado.id}`, values);
          } else {
            await genericPost('empleados', values);
          }
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
      onCancel={() => {
        form.resetFields();
        form.setFieldsValue({});
        onCancel();
      }}
      open={open}
      confirmLoading={loading}
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              name="nombres"
              label="Nombres"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="apellidos"
              label="Apellidos"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Puesto"
              name="puestos_id"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <AppSelect
                menus={puestos}
                label="nombre"
                valueKey="id"
                defaultValue={empleado?.puestos}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarEmpleado;
