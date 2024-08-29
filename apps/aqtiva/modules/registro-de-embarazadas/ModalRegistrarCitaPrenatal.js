import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Modal, Select, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
const dateFormat = 'DD/MM/YYYY';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ModalRegistrarCitaPrenatal = ({ open, onOk, onCancel, embarazada }) => {
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { create, genericPost } = api('citas-embarazadas', dispatch);

  return (
    <Modal
      title={`Registro de cita de: ${embarazada?.nombres}`}
      open={open}
      onCancel={onCancel}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await genericPost(`citas-prenatales/${embarazada?.id}`, values);
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
      <Form form={form} layout={'vertical'}>
        <AppRowContainer>
          <Col xs={24}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'riesgos_detectados'}
              label={'Riesgos detectados'}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'meses'}
              label={'Meses'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'peso'}
              label={'Peso'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'presion_arterial'}
              label={'Presion arterial'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'altura_uterina'}
              label={'Altura uterina'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'foco_fetal'}
              label={'Foco fetal'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'acido_folico_sulfato_ferroso'}
              label={'Acido Folico / Sulfato ferroso'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'laboratorios'}
              label={'Laboratorios'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'tdap'}
              label={'TDAP'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'influenza'}
              label={'Influenza'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'covid'}
              label={'COVID'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'medicamentos'}
              label={'Medicamentos'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              rules={[{ required: true, message: 'Campo requerido' }]}
              name={'fecha_proxima_cita'}
              label={'Proxima cita'}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarCitaPrenatal;
