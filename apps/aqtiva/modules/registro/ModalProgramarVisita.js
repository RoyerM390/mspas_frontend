import React, { useEffect, useState } from 'react';
import {Col, DatePicker, Form, Input, Modal, Select, TimePicker} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
const dateFormat = 'DD/MM/YYYY';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ModalProgramarVisita = ({ open, onOk, onCancel, embarazada }) => {
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [empleados, setEmpleados] = useState([]);
  const { create, genericGet } = api('visitas', dispatch);

  useEffect(() => {
    genericGet('empleados', {}, setEmpleados);
  }, []);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={async () => {
        const values = await form.validateFields();
        console.log(values);
        try {
          await create({ ...values, mujer_embarazada_id: embarazada.id });
          onOk();
        } catch (e) {
          console.log(e);
          if (e.errorFields) {
            return Promise.reject();
          }
        }
      }}
      confirmLoading={loading}
      width={1000}
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label="Personal médico" name="empleados_id" rules={[{required: true, message: 'Campo requerido'}]}>
              <Select
                mode='multiple'
                options={empleados.map((emp) => ({value: emp.id, label: `${emp.nombres} ${emp.apellidos ? emp.apellidos : ''}`}))}
                label="nombres"
                concatLabel={'apellidos'}
                valueKey="id"
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label="Fecha" name="fecha" rules={[{required: true, message: 'Campo requerido'}]}>
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label="Hora" name="hora" rules={[{required: true, message: 'Campo requerido'}]}>
              <TimePicker />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item label="Nota" name="nota">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalProgramarVisita;
