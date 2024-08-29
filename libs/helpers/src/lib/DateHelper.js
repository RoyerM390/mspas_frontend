import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export const getFormattedDate = (date, format = 'DD/MM/YYYY') => {
  if (date) {
    return dayjs(date).utc(false).format(format);
  }
  return '';
};

export const getNombre = (nombre, completo = false) => {
  const {
    primer_nombre,
    segundo_nombre,
    otros_nombres,
    primer_apellido,
    segundo_apellido,
    apellido_casada,
  } = nombre;
  if (completo) {
    return `${primer_nombre} ${segundo_nombre || ''} ${
      otros_nombres || ''
    } ${primer_apellido} ${segundo_apellido || ''} ${apellido_casada || ''}`;
  } else {
    return `${primer_nombre} ${primer_apellido}`;
  }
};

export const getColor = (object) => {
  return object.hexadecimal || object.color;
};
