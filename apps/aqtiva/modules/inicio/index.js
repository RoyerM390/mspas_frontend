import React from 'react';
import AppCard from '@aqtiva/components/AppCard';
import { Flex } from 'antd';
const Inicio = () => {
  return (
    <AppCard>
      <Flex justify={'center'} align={'center'}>
        <picture
          style={{
            width: '70%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="/assets/images/san_martin.jpg" />
        </picture>
      </Flex>
    </AppCard>
  );
};

export default Inicio;
