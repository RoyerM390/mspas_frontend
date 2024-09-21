import React from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { Col, Image, Typography } from 'antd';
import AppCard from '@aqtiva/components/AppCard';
const { Title, Paragraph } = Typography;
const Inicio = () => {
  return (
    <AppCard>
      <picture
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <img src="/assets/images/san_martin.jpg" />
      </picture>
    </AppCard>
  );
};

export default Inicio;
