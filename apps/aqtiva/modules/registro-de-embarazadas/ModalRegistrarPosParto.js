import React, { useEffect } from 'react';
import { DatePicker, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import dayjs from 'dayjs';

const ModalRegistrarPosParto = ({
  onOk,
  onCancel,
  open,
  embarazada,
  posparto,
}) => {
  const dispatch = useDispatch();
  const { genericPost } = api('', dispatch);
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();

  useEffect(() => {
    if (posparto && Object.keys(posparto).length > 0) {
      form.setFieldsValue({
        ...posparto,
        fecha_de_atencion: dayjs(posparto.fecha_de_atencion),
        fecha_de_nacimiento: dayjs(posparto.fecha_de_nacimiento),
      });
    }
  }, [posparto]);

  return (
    <Modal
      title={'Registro de posparto'}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (posparto && Object.keys(posparto).length > 0) {
            await genericPost(
              `embarazadas/editar-posparto/${posparto?.id}`,
              values
            );
          } else {
            await genericPost(
              `embarazadas/registrar-posparto/${embarazada?.id}`,
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
          label={'Fecha de atencion'}
          name={'fecha_de_atencion'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={'Nombre del recien nacido'}
          name={'nombre_de_recien_nacido'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input style={{ fontSize: '25px' }} />
        </Form.Item>
        <Form.Item
          label={'Apellidos del recien nacido'}
          name={'apellidos_de_recien_nacido'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input style={{ fontSize: '25px' }} />
        </Form.Item>
        <Form.Item
          label={'Fecha de nacimiento'}
          name={'fecha_de_nacimiento'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={'Estado de salud'}
          name={'estado_de_salud'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input style={{ fontSize: '25px' }} />
        </Form.Item>
        <Form.Item
          label={'Descripcion'}
          name={'descripcion'}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input style={{ fontSize: '25px' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarPosParto;
