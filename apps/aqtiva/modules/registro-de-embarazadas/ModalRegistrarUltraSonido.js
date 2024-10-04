import React, { useEffect } from 'react';
import { Col, DatePicker, Form, Input, Modal } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { api } from '@aqtiva/helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const ModalRegistrarUltraSonido = ({
  open,
  onOk,
  onCancel,
  embarazada,
  ultrasonido,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ common }) => common);
  const { genericPost } = api('', dispatch);
  useEffect(() => {
    if (ultrasonido && Object.keys(ultrasonido).length > 0) {
      form.setFieldsValue({ ...ultrasonido, fecha: dayjs(ultrasonido.fecha) });
    }
  }, [ultrasonido]);

  return (
    <Modal
      loading={loading}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (ultrasonido && Object.keys(ultrasonido).length > 0) {
            await genericPost(
              `ultra-sonidos/editar/${ultrasonido?.id}`,
              values
            );
          } else {
            await genericPost(`ultra-sonidos/${embarazada?.id}`, values);
          }
          await onOk();
          form.resetFields();
        } catch (e) {
          return Promise.reject(e);
        }
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      open={open}
      width={1000}
    >
      <Form form={form} layout={'vertical'}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Lugar'}
              name={'lugar'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Fecha'}
              name={'fecha'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'BA'}
              name={'ba'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Peso'}
              name={'peso'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Placenta'}
              name={'placenta'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'FCF'}
              name={'fcf'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Pre fetal'}
              name={'pre_fetal'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Edad gestacion'}
              name={'edad_gestacion'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'FPP'}
              name={'fpp'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'PBF'}
              name={'pbf'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={16}>
            <Form.Item label={'Comentarios'} name={'comentarios'}>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarUltraSonido;
