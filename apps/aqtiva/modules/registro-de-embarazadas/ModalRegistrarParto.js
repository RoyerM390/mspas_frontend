import React from 'react';
import { DatePicker, Form, Input, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';

const ModalRegistrarParto = ({ onOk, onCancel, embarazada, open }) => {
  const dispatch = useDispatch();
  const { genericPost } = api('', dispatch);
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();
  return (
    <Modal
      title={'Registro de parto'}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost(
            `embarazadas/registrar-parto/${embarazada?.id}`,
            values
          );
          onOk();
          form.resetFields();
        } catch (e) {
          return Promise.reject(e);
        }
      }}
      onCancel={() => onCancel()}
      open={open}
      width={800}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          label={'Peso'}
          name={'peso'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Fecha'}
          name={'fecha'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={'Hora'}
          name={'hora'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <DatePicker.TimePicker />
        </Form.Item>
        <Form.Item
          label={'Num. de partos'}
          name={'numero_de_partos'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarParto;
