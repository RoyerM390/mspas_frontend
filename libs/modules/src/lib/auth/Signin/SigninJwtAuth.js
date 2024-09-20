import React from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';

import IntlMessages from '@aqtiva/helpers/IntlMessages';
import { useAuthMethod } from '@aqtiva/hooks/AuthHooks';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
} from './index.styled';

const SignInJwtAuth = () => {
  const router = useRouter();
  const { signInUser } = useAuthMethod();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    router.push('/forget-password', { tab: 'jwtAuth' });
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { messages } = useIntl();

  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="basic"
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="usuario"
            className="form-field"
            rules={[{ required: true, message: 'Debe ingresar su usuario' }]}
          >
            <Input placeholder="usuario" />
          </Form.Item>

          <Form.Item
            name="clave"
            className="form-field"
            rules={[{ required: true, message: 'Debe ingresar su contraseña' }]}
          >
            <Input.Password placeholder={messages['common.password']} />
          </Form.Item>

          {/*<StyledRememberMe>*/}
          {/*<Checkbox onChange={onRememberMe}>*/}
          {/*  <IntlMessages id="common.rememberMe" />*/}
          {/*</Checkbox>*/}

          {/*<StyledSignLink onClick={onGoToForgetPassword}>*/}
          {/*  <IntlMessages id="common.forgetPassword" />*/}
          {/*</StyledSignLink>*/}
          {/*</StyledRememberMe>*/}

          <div
            className="form-btn-field"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <SignInButton type="primary" htmlType="submit">
              <IntlMessages id="common.login" />
            </SignInButton>
          </div>

          {/*<div className="form-field-action">*/}
          {/*  <StyledSignTextGrey>*/}
          {/*    <IntlMessages id="common.dontHaveAccount" />*/}
          {/*  </StyledSignTextGrey>*/}
          {/*  <StyledSignLinkTag href="/signup">*/}
          {/*    <IntlMessages id="common.signup" />*/}
          {/*  </StyledSignLinkTag>*/}
          {/*</div>*/}
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SignInJwtAuth;
