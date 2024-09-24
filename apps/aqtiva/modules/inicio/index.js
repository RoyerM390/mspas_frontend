import React from 'react';
import AppCard from '@aqtiva/components/AppCard';
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
