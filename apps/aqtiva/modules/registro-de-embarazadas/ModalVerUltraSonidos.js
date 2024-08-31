import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppCard from '@aqtiva/components/AppCard';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getFormattedDate } from '@aqtiva/helpers';
import ModalRegistrarUltraSonido from './ModalRegistrarUltraSonido';

const ModalVerUltraSonidos = ({ open, onOk, onCancel, embarazada }) => {
  const dispatch = useDispatch();
  const [ultraSonidos, setUltraSonidos] = useState([]);
  const { genericGet } = api('', dispatch);
  const [modalRegistrarUltraSonido, setModalRegistrarUltraSonido] =
    useState(false);

  const getUltraSonidos = async () => {
    genericGet(`ultra-sonidos/${embarazada?.id}`, {}, setUltraSonidos);
  };

  useEffect(() => {
    if (open) {
      getUltraSonidos();
    }
  }, [embarazada, open]);

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} width={700}>
      <AppCard
        extra={[
          <Button
            key={1}
            onClick={() => setModalRegistrarUltraSonido(true)}
            ghost
            type={'primary'}
          >
            Registrar ultrasonido
          </Button>,
        ]}
      >
        <AppTableContainer
          data={ultraSonidos}
          columns={[
            {
              key: 1,
              title: 'Fecha',
              dataIndex: 'fecha',
              render: (fecha) => getFormattedDate(fecha),
            },
            {
              key: 2,
              title: 'Lugar',
              dataIndex: 'lugar',
            },
            {
              key: 3,
              title: 'Acciones',
              render: (item) => (
                <Button size={'small'} type={'primary'} ghost>
                  Ver detalles
                </Button>
              ),
            },
          ]}
        />
      </AppCard>
      <ModalRegistrarUltraSonido
        embarazada={embarazada}
        onOk={async () => {
          await getUltraSonidos();
          setModalRegistrarUltraSonido(false);
        }}
        open={modalRegistrarUltraSonido}
        onCancel={() => setModalRegistrarUltraSonido(false)}
      />
    </Modal>
  );
};

export default ModalVerUltraSonidos;
