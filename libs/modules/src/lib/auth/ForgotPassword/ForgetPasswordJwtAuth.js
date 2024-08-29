import React from "react";
import Link from "next/link";
import { Form, Input } from "antd";
import IntlMessages from "@aqtiva/helpers/IntlMessages";
import { useIntl } from "react-intl";
import {
  StyledForgotBtn,
  StyledForgotContent,
  StyledForgotForm,
  StyledForgotPara,
  StyledFormFooter
} from "./index.styled";

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ForgetPasswordJwtAuth = () => {
  const {messages} = useIntl();

  return (
    <StyledForgotContent>
      <StyledForgotPara>
        <IntlMessages id='common.forgetPasswordTextOne' />
        <span>
          <IntlMessages id='common.forgetPasswordTextTwo' />
        </span>
      </StyledForgotPara>

      <StyledForgotForm
        name='basic'
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          name='email'
          className='form-field'
          rules={[
            {required: true, message: 'Please input your Email Address!'},
          ]}>
          <Input placeholder={messages['common.emailAddress']} />
        </Form.Item>

        <div className='form-field'>
          <StyledForgotBtn type='primary' htmlType='submit'>
            <IntlMessages id='common.sendNewPassword' />
          </StyledForgotBtn>
        </div>

        <StyledFormFooter>
          <IntlMessages id='common.alreadyHavePassword' />
          <Link href='/'>
            <IntlMessages id='common.signIn' />
          </Link>
        </StyledFormFooter>
      </StyledForgotForm>
    </StyledForgotContent>
  );
};

export default ForgetPasswordJwtAuth;
