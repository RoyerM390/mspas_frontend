import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';

const ConsultasGenerales = () => {
  const dispatch = useDispatch();
  const { genericGet } = api('', dispatch);
  const [consultas, setConsultas] = useState([]);
  useEffect(() => {
    genericGet('consultas-generales', {}, setConsultas);
  }, []);

  return (
    <AppsContainer fullView title={'Consulta general'}>
      <AppsPagination />
      <AppTableContainer data={consultas} />
    </AppsContainer>
  );
};

export default ConsultasGenerales;
