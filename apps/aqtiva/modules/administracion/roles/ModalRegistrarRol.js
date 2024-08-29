import React, {useEffect, useState} from 'react';
import {Col, Form, Input, Modal, Select} from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '@aqtiva/helpers/api';

const ModalRegistrarRol = ({open, onOk, onCancel, rol}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ common }) => common);
  const [roles, setRoles] = useState([]);
  const {create} = api('roles', dispatch, setRoles, roles);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(rol)
  }, [rol, open]);


  return (
    <Modal open={open} onOk={async () => {
      try {
         const values = await form.validateFields();
         await create(values);
         onOk();
      } catch (e) {
        if(e.errorFields) {
          return Promise.reject()
        }
      }
    }} onCancel={onCancel} confirmLoading={loading}>
      <Form form={form}>
       <AppRowContainer>
         <Col xs={24}>
           <Form.Item label='Permisos' name='permisos' rules={[{required: true, message: 'Campo requerido'}]}>
             <Select options={
               [
                 {
                   label: 'Módulo de registro de embarazadas',
                   value: 'Visitas'
                 },
                 {
                   label: 'Módulo de visitas registradas',
                   value: 'Visitas Registradas'
                 },
                 {
                   label: 'Módulo de nacimientos',
                   value: 'Nacimientos'
                 },
                 {
                   label: 'Módulo de defunciones',
                   value: 'Defunciones'
                 },
                 {
                   label: 'Módulo de importación de datos',
                   value: 'Importacion'
                 },
                 {
                   label: 'Módulo de reportes',
                   value: 'Reportes'
                 },
                 {
                   label: 'Módulo de importación de administracion',
                   value: 'Administracion'
                 }
               ]
             } mode='multiple' />
           </Form.Item>
         </Col>
         <Col xs={24}>
           <Form.Item label='Nombre' name='nombre' rules={[{required: true, message: 'Campo requerido'}]}>
              <Input />
           </Form.Item>
         </Col>
       </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarRol;
