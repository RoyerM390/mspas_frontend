import React, { useEffect, useState } from 'react';
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { cuiValido } from 'validador-dpi-nit';
import AppSelect from '@aqtiva/components/AppSelect';
import dayjs from 'dayjs';
import { map } from 'lodash';

const ModalRegistrarPosparto = ({ onOk, onCancel, open, registro }) => {
  const dispatch = useDispatch();
  const { genericGet, genericPost } = api('', dispatch);
  const [form] = Form.useForm();
  const [centrosDeSalud, setCentrosDeSalud] = useState([]);
  const [pueblos, setPueblos] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [agregarEncargado, setAgregarEncargado] = useState(false);
  const format = 'DD/MM/YYYY';
  const { loading } = useSelector(({ common }) => common);
  useEffect(() => {
    genericGet('centros-de-salud', dispatch, setCentrosDeSalud, centrosDeSalud);
    genericGet('pueblos', dispatch, setPueblos, pueblos);
  }, []);
  const centroDeSalud = Form.useWatch('centro_de_salud_id', form);

  useEffect(() => {
    // form.resetFields(['sector_id']);
    if (centroDeSalud) {
      genericGet(
        `centros-de-salud/sectores/${centroDeSalud}`,
        dispatch,
        setSectores,
        sectores
      );
    }
  }, [centroDeSalud]);

  useEffect(() => {
    if (registro) {
      form.setFieldsValue({ ...registro?.pos_partos });
      form.setFieldsValue({ ...registro });
      form.setFieldValue(
        'fecha_de_nacimiento',
        dayjs(registro?.pos_partos?.fecha_de_nacimiento).utc(false)
      );
      form.setFieldValue(
        'fecha_nacimiento',
        dayjs(registro?.fecha_nacimiento).utc(false)
      );
      form.setFieldValue('sector_id', registro.sector_id);
      form.setFieldValue('pueblo', registro.pueblo_id);
      if (registro?.encargado_embarazada) {
        form.setFieldsValue({
          encargado: [
            {
              cui: registro?.encargado_embarazada.cui,
              nombres: registro?.encargado_embarazada.nombres,
              apellidos: registro?.encargado_embarazada.apellidos,
              telefono: +registro?.encargado_embarazada.telefono || 0,
              direccion: registro?.encargado_embarazada.direccion,
            },
          ],
        });
        setAgregarEncargado(true);
      }
    }
  }, [registro]);

  return (
    <Modal
      width="100vw"
      open={open}
      confirmLoading={loading}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (registro) {
            await genericPost(
              `embarazadas/solo-posparto/actualizar/${registro.id}`,
              {
                ...values,
                encargado:
                  values?.encargado?.length > 0
                    ? values.encargado[0]
                    : undefined,
              }
            );
          } else {
            await genericPost('embarazadas/solo-posparto', {
              ...values,
              encargado:
                values?.encargado?.length > 0 ? values.encargado[0] : undefined,
            });
          }
          form.resetFields();
          onOk();
        } catch (e) {
          console.log(e);
          if (e.errorFields) {
            return Promise.reject();
          }
        } finally {
          setAgregarEncargado(false);
        }
      }}
      onCancel={() => {
        setAgregarEncargado(false);
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form}
        autoComplete="off"
        initialValues={{
          encargado: [
            {
              cui: '',
              nombres: '',
              apellidos: '',
              telefono: '',
              direccion: '',
            },
          ],
        }}
      >
        <Divider>Datos generales</Divider>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              name="cui"
              label="CUI"
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
              <Input
                autoComplete="off"
                style={{ width: '100%', fontSize: '15px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              style={{ fontSize: '15px' }}
              label={'Num. de casa'}
              name={'numero_de_casa'}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Num. de expediente'} name={'numero_expediente'}>
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              name="nombres"
              label="Nombres"
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input autoComplete="off" style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="apellidos"
              label="Apellidos"
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input autoComplete="off" style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="fecha_nacimiento"
              label="Fecha de nacimiento"
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <DatePicker
                format={format}
                style={{ fontSize: '15px', width: '100%' }}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Centro comunitario'}
              name={'centro_de_salud_id'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Select
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
            <Form.Item
              label={'Comunidad'}
              name={'sector_id'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <AppSelect
                menus={sectores}
                label={'nombre'}
                valueKey={'id'}
                defaultValue={registro?.sectores || null}
              />
            </Form.Item>
          </Col>
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
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label="Telefono"
              name="telefono"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <InputNumber
                autoComplete="off"
                style={{ width: '100%', fontSize: '15px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Ocupacion"
              name="ocupacion"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input autoComplete="off" style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Direccion"
              name="direccion"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input.TextArea style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Divider>Embarazo</Divider>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              label={'Cesarea'}
              name={'cesarea'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'HM'}
              name={'hm'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'HV'}
              name={'hv'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'AB'}
              name={'ab'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              label={'PES'}
              name={'pes'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'GESTAS'}
              name={'gestas'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Observaciones" name="observaciones">
              <Input.TextArea style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Divider>Datos de posparto</Divider>
        <AppRowContainer>
          <Col xs={12}>
            <Form.Item
              label={'Nombre del recien nacido'}
              name={'nombre_de_recien_nacido'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label={'Apellidos del recien nacido'}
              name={'apellidos_de_recien_nacido'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Fecha de nacimiento'}
              name={'fecha_de_nacimiento'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Estado de salud'}
              name={'estado_de_salud'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Descripcion'} name={'descripcion'}>
              <Input style={{ fontSize: '15px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col>
            <Form.Item label="Agregar encargado">
              <Switch
                onChange={(value) => {
                  setAgregarEncargado(value);
                }}
                defaultChecked={agregarEncargado}
                checked={agregarEncargado}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        {agregarEncargado && (
          <>
            <Divider>Datos del encargado</Divider>
            <Form.List name={'encargado'}>
              {(fields) =>
                fields.map((field) => (
                  <React.Fragment key={field.key}>
                    <AppRowContainer>
                      <Col xs={8}>
                        <Form.Item
                          label="CUI"
                          name={[field.name, 'cui']}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  value === null ||
                                  value === '' ||
                                  value === undefined
                                ) {
                                  return Promise.resolve();
                                } else if (cuiValido(value)) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('El CUI no es valido');
                              },
                            }),
                          ]}
                        >
                          <Input
                            autoComplete="off"
                            style={{ fontSize: '15px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={8}>
                        <Form.Item
                          label="Nombres"
                          name={[field.name, 'nombres']}
                          rules={[
                            { required: true, message: 'Campo requerido' },
                          ]}
                        >
                          <Input
                            autoComplete="off"
                            style={{ fontSize: '15px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={8}>
                        <Form.Item
                          label="Apellidos"
                          name={[field.name, 'apellidos']}
                          rules={[
                            { required: true, message: 'Campo requerido' },
                          ]}
                        >
                          <Input
                            autoComplete="off"
                            style={{ fontSize: '15px' }}
                          />
                        </Form.Item>
                      </Col>
                    </AppRowContainer>
                    <AppRowContainer>
                      <Col xs={8}>
                        <Form.Item
                          name={[field.name, 'telefono']}
                          label="Telefono"
                          rules={[
                            { required: true, message: 'Campo requerido' },
                          ]}
                        >
                          <InputNumber
                            autoComplete="off"
                            style={{ fontSize: '15px', width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={16}>
                        <Form.Item
                          name={[field.name, 'direccion']}
                          label="Direccion"
                          rules={[
                            { required: true, message: 'Campo requerido' },
                          ]}
                        >
                          <Input.TextArea style={{ fontSize: '15px' }} />
                        </Form.Item>
                      </Col>
                    </AppRowContainer>
                  </React.Fragment>
                ))
              }
            </Form.List>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalRegistrarPosparto;
