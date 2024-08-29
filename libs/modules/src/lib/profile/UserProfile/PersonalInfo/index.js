import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input } from 'antd';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { useDropzone } from 'react-dropzone';
import { useAuthUser } from '@aqtiva/hooks/AuthHooks';
import { StyledInfoUpload, StyledInfoUploadAvatar } from './index.styled';
import { getFormattedDate } from '@aqtiva/helpers';

const PersonalInfo = () => {
  const { user } = useAuthUser();

  const [userImage, setUserImage] = useState('/assets/images/placeholder.jpg');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const onReset = () => {
    setUserImage('/assets/images/placeholder.jpg');
  };

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <>
      <StyledInfoUpload>
        <StyledInfoUploadAvatar src={userImage} />
      </StyledInfoUpload>
      <AppRowContainer gutter={8}>
        <Col xs={24} md={8}>
          <p>Nombres</p>
          <Input readOnly value={user.empleado?.nombres} />
        </Col>
        <Col xs={24} md={8}>
          <p>Apellidos</p>
          <Input readOnly value={user.empleado?.apellidos} />
        </Col>
      </AppRowContainer>
      <AppRowContainer>
        <Col xs={24} md={8}>
          <p>CUI</p>
          <Input type="text" readOnly value={user.empleado?.cui} />
        </Col>
      </AppRowContainer>
    </>
  );
};

export default PersonalInfo;
