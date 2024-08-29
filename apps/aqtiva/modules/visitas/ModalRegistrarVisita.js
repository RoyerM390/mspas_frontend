import React from 'react';
import {Form, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import {api} from '@aqtiva/helpers/api';
import AppRowContainer from '@aqtiva/components/AppRowContainer';

const ModalRegistrarVisita = ({open, onOk, onCancel, visita}) => {
  const dispatch = useDispatch();
  const {genericPost} = api('', dispatch);
  const [form] = Form.useForm();
  return (
    <Modal width='100vw' onOk={onOk} onCancel={onCancel} open={open}>
      <Form form={form}>
        <AppRowContainer>
          <Form.Item>
            
          </Form.Item>
        </AppRowContainer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarVisita;
