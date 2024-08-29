import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';

const ModalRegistrarPuesto = ({ open, onOk, onCancel, puesto }) => {
  const { loading } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const { create, edit } = api('puestos/', dispatch);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(puesto);
  }, [puesto, open]);

  return (
    <Modal
      confirmLoading={loading}
      open={open}
      title="Registrar puesto"
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (puesto) {
            await edit({ ...values, id: puesto.id });
          } else {
            await create({ ...values });
          }
          onOk();
          form.resetFields();
          form.setFieldsValue({});
        } catch (e) {
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
    >
      <Form form={form}>
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarPuesto;
