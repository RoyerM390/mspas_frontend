import React, {useEffect, useState} from 'react';
import {Col, DatePicker, Form, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import {api} from '@aqtiva/helpers/api';
import AppSelect from '@aqtiva/components/AppSelect';
import {debounce} from 'lodash';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ModalProgramarVisita = ({open, onOk, onCancel}) => {
  const dispatch = useDispatch();
  const [mujeresEmbarazadas, setMujeresEmbarazadas] = useState([]);
  const [form] = Form.useForm();
  const {get} = api('mujeres-embarazadas', dispatch, setMujeresEmbarazadas, mujeresEmbarazadas);
  useEffect(() => {
    get();
  }, []);
  const debouncedGetEmbarazadas = debounce(get, 350);
  return (
    <Modal onOk={onOk} open={open} onCancel={onCancel} width='100vw' title='Registrar visita'>
      <Form form={form}>
        <AppRowContainer>
          <Col xs={8}>
            <Form.Item label='Paciente' name='embarazada' rules={[{required: true, message: 'Campo requerido'}]}>
              <AppSelect menus={mujeresEmbarazadas} onChange={(value) => debouncedGetEmbarazadas(value)}  showSearch valueKey='id' label='nombres' concatLabel='apellidos' />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label='Encargado' name='embarazada' rules={[{required: true, message: 'Campo requerido'}]}>
              <AppSelect menus={mujeresEmbarazadas} onChange={(value) => debouncedGetEmbarazadas(value)}  showSearch valueKey='id' label='nombres' concatLabel='apellidos' />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label='Fecha programada' name='fecha_programada' rules={[{required: true, message: 'Campo requerido'}]}>
              <DatePicker />
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalProgramarVisita;
