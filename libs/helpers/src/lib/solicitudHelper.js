import dayjs from 'dayjs';

const getDatosPersona = (solicitud) => {
  const referencia1 = solicitud.referencias_solicitud_prestamos[0];
  const referencia2 = solicitud.referencias_solicitud_prestamos[1];
  return {
    ...solicitud.clientes,
    fecha_nacimiento: dayjs(solicitud.clientes.fecha_nacimiento).utc(false),
    departamento: solicitud.clientes.municipios.departamentos_id,
    municipio: solicitud.clientes.municipios_id,
    referencia_personal_nombre_1: referencia1.nombre,
    referencia_personal_relacion_1: referencia1.relacion,
    referencia_personal_telefono_1: referencia1.telefono,
    referencia_personal_nombre_2: referencia2.nombre,
    referencia_personal_relacion_2: referencia2.relacion,
    referencia_personal_telefono_2: referencia2.telefono,
  };
};

const getDatosNegocio = (solicitud) => {
  const negocio = solicitud.negocio_cliente[0];
  return {
    ...negocio,
    municipio: negocio.municipio_id,
    departamento: negocio.municipios.departamentos_id,
  };
};

const getDatosFinanciamiento = (solicitud) => {
  return {
    ...solicitud,
  };
};

export { getDatosFinanciamiento, getDatosNegocio, getDatosPersona };
