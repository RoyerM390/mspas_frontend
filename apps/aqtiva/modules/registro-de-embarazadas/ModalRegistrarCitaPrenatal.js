import React, { useEffect, useState } from 'react';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
const dateFormat = 'DD/MM/YYYY';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ModalRegistrarCitaPrenatal = ({
  open,
  onOk,
  onCancel,
  embarazada,
  cita,
}) => {
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { create, genericPost } = api('citas-embarazadas', dispatch);

  useEffect(() => {
    if (cita && Object.keys(cita).length > 0) {
      form.setFieldsValue({
        ...cita,
        fecha_proxima_cita: cita.fecha_proxima_cita
          ? dayjs(cita.fecha_proxima_cita)
          : null,
      });
    }
  }, [cita]);

  return (
    <Modal
      title={`Registro de cita de: ${embarazada?.nombres}`}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          console.log(values);
          console.log(typeof values.fecha_proxima_cita);
          console.log(dayjs.isDayjs(values.fecha_proxima_cita));
          const fecha =
            values.fecha_proxima_cita &&
            dayjs(values.fecha_proxima_cita).isValid()
              ? dayjs(values?.fecha_proxima_cita)
                  ?.utc(true)
                  ?.startOf('date')
                  ?.toISOString()
              : undefined;
          if (cita && Object.keys(cita).length > 0) {
            await genericPost(`citas-prenatales/editar/${cita?.id}`, {
              ...values,
              fecha_proxima_cita: fecha,
            });
          } else {
            await genericPost(`citas-prenatales/${embarazada?.id}`, {
              ...values,
              fecha_proxima_cita: fecha,
            });
          }
          onOk();
          form.resetFields();
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
            <Form.Item name={'riesgos_detectados'} label={'Riesgos detectados'}>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item name={'control'} label={'Num. de control'}>
              <InputNumber autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'meses'} label={'Meses'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'peso'} label={'Peso'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'presion_arterial'} label={'Presion arterial'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item name={'altura_uterina'} label={'Altura uterina'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'foco_fetal'} label={'Foco fetal'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              name={'acido_folico_sulfato_ferroso'}
              label={'Acido Folico / Sulfato ferroso'}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'laboratorios'} label={'Laboratorios'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item name={'tdap'} label={'TDAP'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'influenza'} label={'Influenza'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'covid'} label={'COVID'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'medicamentos'} label={'Medicamentos'}>
              <Input autoComplete={'off'} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item name={'fecha_proxima_cita'} label={'Proxima cita'}>
              <DatePicker />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarCitaPrenatal;
