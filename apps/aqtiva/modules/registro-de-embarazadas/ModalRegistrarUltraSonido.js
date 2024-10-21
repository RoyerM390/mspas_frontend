import React, { useEffect } from 'react';
import { Col, DatePicker, Form, Input, Modal } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { api } from '@aqtiva/helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
const format = 'DD/MM/YYYY';
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
      form.setFieldsValue({
        ...ultrasonido,
        fecha: ultrasonido.fecha ? dayjs(ultrasonido.fecha).utc(false) : null,
      });
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
            <Form.Item label={'Lugar'} name={'lugar'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Fecha'} name={'fecha'}>
              <DatePicker format={format} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'BA'} name={'ba'}>
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'Peso'} name={'peso'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Placenta'} name={'placenta'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'FCF'} name={'fcf'}>
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'Pre fetal'} name={'pre_fetal'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Edad gestacion'} name={'edad_gestacion'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'FPP'} name={'fpp'}>
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'PBF'} name={'pbf'}>
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
