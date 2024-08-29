import React, { useEffect, useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getFormattedDate } from '@aqtiva/helpers';
import dayjs from 'dayjs';
import { IoEyeOutline } from 'react-icons/io5';

const ModalVerCitasPrenatales = ({ open, onOk, onCancel, embarazada }) => {
  const dispatch = useDispatch();
  const [citasPrenatales, setCitasPrenatales] = useState([]);
  const { genericGet } = api('citas-prenatales', dispatch);

  useEffect(() => {
    if (open) {
      genericGet(`citas-prenatales/${embarazada?.id}`, {}, setCitasPrenatales);
    }
  }, [open, embarazada]);

  return (
    <Modal onOk={onOk} onCancel={onCancel} open={open} width={1000}>
      <AppTableContainer
        data={citasPrenatales}
        columns={[
          {
            title: 'Fecha asistencia',
            dataIndex: 'fecha_asistencia',
            render: (fecha) => getFormattedDate(fecha),
          },
          {
            title: 'Fecha proxima cita',
            dataIndex: 'fecha_proxima_cita',
            render: (fecha) => (
              <Tag
                color={dayjs(fecha).diff(dayjs(), 'day') <= 3 ? 'red' : 'blue'}
              >
                {getFormattedDate(fecha)}
              </Tag>
            ),
          },
          {
            title: 'Acciones',
            render: () => (
              <Button
                icon={<IoEyeOutline />}
                ghost
                type={'primary'}
                size="small"
              >
                Ver detalles
              </Button>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default ModalVerCitasPrenatales;
