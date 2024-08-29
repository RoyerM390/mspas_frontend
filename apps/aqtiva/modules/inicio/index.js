import React from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import {Col, Image, Typography} from 'antd';
import AppCard from '@aqtiva/components/AppCard';
const { Title, Paragraph } = Typography;
const Inicio = () => {

  return (
    <AppCard>
      <AppRowContainer justify='space-around' style={{marginTop: '2rem', marginLeft: '2rem', marginRight: '2rem'}}>
        <Col xs={12}>
          <Title level={2}>Misión</Title>
          <Paragraph style={{textAlign: 'justify'}}>
            Garantizar la prevención, recuperación y rehabilitación de la salud de los habitantes del municipio de San Juan Ostuncalco con énfasis en grupos vulnerables como niñez, mujeres y adultos mayores a través del cumplimiento de todos los programas prioritarios del Ministerio de Salud.
          </Paragraph>
        </Col>
        <Col xs={12}>
          <Title level={2}>Visión</Title>
          <Paragraph style={{textAlign: 'justify'}}>
            Contribuir al desarrollo integral de la salud de los habitantes a través del alcance de las coberturas ideales en los diferentes programas de inmunización y atención de salud materna neonatal.
          </Paragraph>
        </Col>
      </AppRowContainer>
      <picture style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img src='/assets/images/san_juan_ostuncalco.jpg' />
      </picture>
    </AppCard>
  );
};

export default Inicio;
