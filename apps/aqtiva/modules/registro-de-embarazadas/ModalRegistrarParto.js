import React, { useEffect } from 'react';
import { DatePicker, Form, Input, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import dayjs from 'dayjs';

const ModalRegistrarParto = ({ onOk, onCancel, embarazada, open, parto }) => {
  const dispatch = useDispatch();
  const { genericPost } = api('', dispatch);
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();

  useEffect(() => {
    if (parto && Object.keys(parto).length > 0) {
      form.setFieldsValue({
        ...parto,
        fecha: dayjs(parto.fecha),
        hora: dayjs(parto.hora),
      });
    }
  }, [parto]);

  return (
    <Modal
      title={'Registro de parto'}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (parto && Object.keys(parto).length > 0) {
            await genericPost(`embarazadas/editar-parto/${parto?.id}`, values);
          } else {
            await genericPost(
              `embarazadas/registrar-parto/${embarazada?.id}`,
              values
            );
          }
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
