import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Modal, Space, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getFormattedDate } from '@aqtiva/helpers';
import dayjs from 'dayjs';
import { IoEyeOutline } from 'react-icons/io5';
import AppCard from '@aqtiva/components/AppCard';
import ModalRegistrarCitaPrenatal from './ModalRegistrarCitaPrenatal';
import { CiEdit } from 'react-icons/ci';

const ModalVerCitasPrenatales = ({ open, onOk, onCancel, embarazada }) => {
  const dispatch = useDispatch();
  const [citasPrenatales, setCitasPrenatales] = useState([]);
  const { genericGet } = api('citas-prenatales', dispatch);
  const [modalRegistrarCita, setModalRegistrarCita] = useState(false);
  const [cita, setCita] = useState({});
  const get = async () => {
    genericGet(`citas-prenatales/${embarazada?.id}`, {}, setCitasPrenatales);
  };
  useEffect(() => {
    if (open) {
      get();
    }
  }, [open, embarazada]);

  const verDetalles = (item) => {
    const items = [
      {
        label: 'Riesgos detectados',
        children: item.riesgos_detectados,
        span: 3,
      },
      {
        label: 'Num. de control',
        children: item.control,
      },
      {
        label: 'Meses',
        children: item.meses,
      },
      {
        label: 'Peso',
        children: item.peso,
      },
      {
        label: 'Presion arterial',
        children: item.presion_arterial,
      },
      {
        label: 'Altura uterina',
        children: item.altura_uterina,
      },
      {
        label: 'Foco fetal',
        children: item.foco_fetal,
      },
      {
        label: 'Acido folico / Sulfato Ferroso',
        children: item.acido_folico_sulfato_ferroso,
      },
      {
        label: 'Laboratorios',
        children: item.laboratorios,
      },
      {
        label: 'TDAP',
        children: item.tdap,
      },
      {
        label: 'Influlenza',
        children: item.influenza,
      },
      {
        label: 'covid',
        children: item.covid,
      },
      {
        label: 'Medicamentos',
        children: item.medicamentos,
      },
      {
        label: 'Fecha proxima cita',
        children: getFormattedDate(item.fecha_proxima_cita),
      },
    ];
    Modal.info({
      width: 1000,
      title: 'Detalles cita',
      content: (
        <>
          <Descriptions
            items={items.map((it, i) => ({ ...it, key: i }))}
            bordered={true}
          />
        </>
      ),
    });
  };

  return (
    <Modal onOk={onOk} onCancel={onCancel} open={open} width={700}>
      <AppCard
        extra={[
          <Button
            key={1}
            ghost
            type={'primary'}
            onClick={() => setModalRegistrarCita(true)}
          >
            Registrar visita
          </Button>,
        ]}
      >
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
                  color={
                    dayjs(fecha).diff(dayjs(), 'day') <= 3 ? 'red' : 'blue'
                  }
                >
                  {getFormattedDate(fecha)}
                </Tag>
              ),
            },
            {
              title: 'Acciones',
              render: (item) => (
                <Space>
                  <Button
                    icon={<IoEyeOutline />}
                    ghost
                    type={'primary'}
                    size="small"
                    onClick={() => verDetalles(item)}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    icon={<CiEdit />}
                    ghost
                    type={'primary'}
                    size="small"
                    onClick={() => {
                      setCita(item);
                      setModalRegistrarCita(true);
                    }}
                  >
                    Editar
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </AppCard>
      <ModalRegistrarCitaPrenatal
        cita={cita}
        embarazada={embarazada}
        onOk={async () => {
          await get();
          setModalRegistrarCita(false);
        }}
        open={modalRegistrarCita}
        onCancel={() => setModalRegistrarCita(false)}
      />
    </Modal>
  );
};

export default ModalVerCitasPrenatales;
