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
import dayjs from 'dayjs';
import AppSelect from '@aqtiva/components/AppSelect';

const format = 'DD/MM/YYYY';
const ModalRegistrarMujeresEmbarazadas = ({
  open,
  onOk,
  onCancel,
  registro,
}) => {
  const { loading } = useSelector(({ common }) => common);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [agregarEncargado, setAgregarEncargado] = useState(false);
  const [sectores, setSectores] = useState([]);
  const { create, genericGet, genericPost } = api('embarazadas', dispatch);
  const [centrosDeSalud, setCentrosDeSalud] = useState([]);
  const [pueblos, setPueblos] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [enfermedadesSeleccionadas, setEnfermedadesSeleccionadas] = useState(
    []
  );
  const centroDeSalud = Form.useWatch('centro_de_salud_id', form);

  useEffect(() => {
    genericGet('enfermedades', dispatch, setEnfermedades, enfermedades);
    genericGet('centros-de-salud', dispatch, setCentrosDeSalud, centrosDeSalud);
    genericGet('pueblos', dispatch, setPueblos, pueblos);
  }, []);

  useEffect(() => {
    form.resetFields(['sector_id']);
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
      form.setFieldsValue({
        ...registro,
        enfermedades: registro.embarazadas_enfermedades.map(
          (me) => me.enfermedades_id
        ),
        fecha_nacimiento: dayjs(registro.fecha_nacimiento),
        fecha_parto: dayjs(registro.fecha_parto),
        fecha_ultima_regla: dayjs(registro.fecha_parto),
      });
      if (registro.encargado_embarazada) {
        console.log(registro.encargado_embarazada);
        form.setFieldsValue({
          encargado: [
            {
              cui: registro.encargado_embarazada.cui,
              nombres: registro.encargado_embarazada.nombres,
              apellidos: registro.encargado_embarazada.apellidos,
              telefono: +registro.encargado_embarazada.telefono || 0,
              direccion: registro.encargado_embarazada.direccion,
            },
          ],
        });
        setAgregarEncargado(true);
      }
    } else {
      form.setFieldsValue({
        cui: '',
        nombres: '',
        apellidos: '',
        enfermedades: [],
        fecha_nacimiento: '',
        tipo_sangre: '',
        ocupacion: '',
        telefono: '',
        direccion: '',
        fecha_parto: '',
        encargado_cui: '',
        encargado_nombres: '',
        encargado_apellidos: '',
        encargado_telefono: '',
        encargado_direccion: '',
      });
    }
  }, [open, registro]);

  return (
    <Modal
      width="100vw"
      title="Registrar mujer embarazada"
      open={open}
      confirmLoading={loading}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          if (registro) {
            await genericPost(`embarazadas/actualizar/${registro.id}`, values);
          } else {
            await create({
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
                style={{ width: '100%', fontSize: '25px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              style={{ fontSize: '25px' }}
              label={'Num. de casa'}
              name={'numero_de_casa'}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={'Num. de expediente'} name={'numero_expediente'}>
              <Input style={{ fontSize: '25px' }} />
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
              <Input autoComplete="off" style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="apellidos"
              label="Apellidos"
              rules={[{ required: true, message: 'Campo obligatorio' }]}
            >
              <Input autoComplete="off" style={{ fontSize: '25px' }} />
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
                style={{ fontSize: '25px', width: '100%' }}
              />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Centro de salud'}
              name={'centro_de_salud_id'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <AppSelect
                style={{ fontSize: '25px' }}
                menus={centrosDeSalud}
                label={'nombre'}
                valueKey={'id'}
                defaultValue={registro?.centros_de_salud || null}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Sector'}
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
                style={{ width: '100%', fontSize: '25px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Ocupacion"
              name="ocupacion"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input autoComplete="off" style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Direccion"
              name="direccion"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input.TextArea style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Divider>Embarazo</Divider>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              label={'Fecha ultima regla'}
              name={'fecha_ultima_regla'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Gestas'}
              name={'gestas'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label={'Cesarea'}
              name={'cesarea'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={6}>
            <Form.Item
              label={'HM'}
              name={'hm'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'HV'}
              name={'hv'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'AB'}
              name={'ab'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={'PES'}
              name={'pes'}
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <Input style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item
              name="fecha_parto"
              label="Fecha de parto prevista"
              rules={[{ required: true, message: 'Campo requerido' }]}
            >
              <DatePicker format={format} style={{ fontSize: '25px' }} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item name="enfermedades" label="Enfermedades">
              <Select
                style={{ fontSize: '25px' }}
                mode="multiple"
                options={enfermedades.map((enfermedad) => ({
                  value: enfermedad.id,
                  label: enfermedad.nombre,
                }))}
                onChange={(value) => setEnfermedadesSeleccionadas(value)}
              />
            </Form.Item>
          </Col>
          {enfermedadesSeleccionadas.includes(6) && (
            <Col xs={8}>
              <Form.Item
                label="Otras enfermedades"
                name="otras_enfermedades"
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Input.TextArea style={{ fontSize: '25px' }} />
              </Form.Item>
            </Col>
          )}
        </AppRowContainer>
        <AppRowContainer>
          <Col xs={24}>
            <Form.Item label="Observaciones" name="observaciones">
              <Input.TextArea style={{ fontSize: '25px' }} />
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
                            style={{ fontSize: '25px' }}
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
                            style={{ fontSize: '25px' }}
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
                            style={{ fontSize: '25px' }}
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
                            style={{ fontSize: '25px', width: '100%' }}
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
                          <Input.TextArea style={{ fontSize: '25px' }} />
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

export default ModalRegistrarMujeresEmbarazadas;
