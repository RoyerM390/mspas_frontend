import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import IntlMessages from '@aqtiva/helpers/IntlMessages';
import {
  StyledUserProfileForm,
  StyledUserProfileFormTitle,
  StyledUserProfileGroupBtn,
} from '../index.styled';
import { api } from '@aqtiva/helpers/api';
import { useDispatch } from 'react-redux';
import { useAuthUser } from '@aqtiva/hooks/AuthHooks';

const ChangePassword = () => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const { genericPost } = api('', dispatch);
  const [endpoint, setEndpoint] = useState('auth/reset-password/');

  useEffect(() => {
    setEndpoint(`auth/reset-password/${user.id}`);
  }, [user]);

  const onFinish = async (values) => {
    await genericPost(endpoint, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledUserProfileForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <StyledUserProfileFormTitle>
        <IntlMessages id="userProfile.changePassword" />
      </StyledUserProfileFormTitle>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input.Password placeholder="Ingrese contraseña" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} />
        <Col xs={24} md={12}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input.Password placeholder="Contraseña nueva" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Campo obligatorio',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('La confirmación no coincide');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmar contraseña nueva" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <StyledUserProfileGroupBtn
            shouldUpdate
            className="user-profile-group-btn"
          >
            <Button type="primary" htmlType="submit">
              Guardar cambios
            </Button>
            <Button htmlType="cancel">Cancelar</Button>
          </StyledUserProfileGroupBtn>
        </Col>
      </AppRowContainer>
    </StyledUserProfileForm>
  );
};

export default ChangePassword;
