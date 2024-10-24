import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { cuiValido } from 'validador-dpi-nit';
import AppSelect from '@aqtiva/components/AppSelect';
import { map } from 'lodash';
import dayjs from 'dayjs';

const ModalRegistrarConsulta = ({ open, onOk, onCancel, registro }) => {
  const { loading } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [consultas, setConsultas] = useState([]);
  const [centrosDeSalud, setCentrosDeSalud] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [pueblos, setPueblos] = useState([]);
  const { genericPost, genericGet } = api(
    '',
    dispatch,
    setConsultas,
    consultas
  );
  const centroDeSalud = Form.useWatch('centro_de_salud_id', form);
  const migrante = Form.useWatch('migrante', form);

  useEffect(() => {
    genericGet('centros-de-salud', {}, setCentrosDeSalud);
    genericGet('pueblos', {}, setPueblos);
  }, []);

  useEffect(() => {
    if (registro) {
      form.setFieldsValue({
        ...registro,
        pueblo: registro.pueblo_id,
        fecha_nacimiento: dayjs(registro.fecha_nacimiento),
      });
    }
  }, [registro]);

  useEffect(() => {
    //form.resetFields(['sector_id']);
    if (centroDeSalud) {
      genericGet(
        `centros-de-salud/sectores/${centroDeSalud}`,
        dispatch,
        setSectores,
        sectores
      );
    }
  }, [centroDeSalud]);

  return (
    <Modal
      confirmLoading={loading}
      width={'100vw'}
      open={open}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (registro && Object.keys(registro).length > 0) {
            await genericPost(`consultas-generales/${registro?.id}`, values);
          } else {
            await genericPost('consultas-generales', values);
          }
          onOk();
          form.resetFields();
        } catch (e) {
          return Promise.reject();
        }
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'CUI'}
              name={'cui'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value === null || value === '' || value === undefined) {
                      return Promise.resolve();
                    } else if (cuiValido(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('El CUI no es valido');
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Nombres'}
              name={'nombres'}
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Apellidos'}
              name={'apellidos'}
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Fecha de nacimiento'}
              name={'fecha_nacimiento'}
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Centro comunitario'} name={'centro_de_salud_id'}>
              <Select
                allowClear={true}
                options={map(centrosDeSalud, (value, key) => {
                  return {
                    label: <span>{key}</span>,
                    title: key,
                    options: map(value, (item) => ({
                      label: <span>{item.nombre}</span>,
                      value: item.id,
                    })),
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Comunidad'} name={'sector_id'}>
              <AppSelect
                menus={sectores}
                label={'nombre'}
                valueKey={'id'}
                defaultValue={registro?.sectores || null}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Pueblo'}
              name={'pueblo'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <AppSelect
                menus={pueblos}
                label={'nombre'}
                valueKey={'id'}
                defaultValue={registro?.pueblos}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Num. de casa'} name={'numero_de_casa'}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Telefono'} name={'telefono'}>
              <Input />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Direccion'}
              name={'direccion'}
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Motivo de consulta'}
              name={'motivo_consulta'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Observaciones'} name={'observaciones'}>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label={'Medicamento'} name={'medicamento'}>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={5}>
            <Form.Item
              label={'Migrante'}
              name={'migrante'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Radio.Group>
                <Radio value={true}>SI</Radio>
                <Radio value={false}>NO</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {migrante && (
            <Col xs={11}>
              <Form.Item
                label={'Lugar'}
                name={'lugar_migrante'}
                rules={[{ required: migrante, message: 'Campo requerido' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          )}
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarConsulta;
