import React, { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import AppCard from '@aqtiva/components/AppCard';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { getFormattedDate } from '@aqtiva/helpers';
import ModalRegistrarUltraSonido from './ModalRegistrarUltraSonido';
import ModalVerUltraSonido from './ModalVerDetalleUltraSonido';
import { CiEdit } from 'react-icons/ci';

const ModalVerUltraSonidos = ({ open, onOk, onCancel, embarazada }) => {
  const dispatch = useDispatch();
  const [ultraSonidos, setUltraSonidos] = useState([]);
  const { genericGet } = api('', dispatch);
  const [modalRegistrarUltraSonido, setModalRegistrarUltraSonido] =
    useState(false);
  const [modalVerUltraSonido, setModalVerUltraSonido] = useState(false);
  const [ultraSonido, setUltraSonido] = useState({});

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
                <Space>
                  <Button
                    size={'small'}
                    type={'primary'}
                    ghost
                    onClick={() => {
                      setUltraSonido(item);
                      setModalVerUltraSonido(true);
                    }}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    size={'small'}
                    type={'primary'}
                    ghost
                    icon={<CiEdit />}
                    onClick={() => {
                      setUltraSonido(item);
                      setModalRegistrarUltraSonido(true);
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
      <ModalRegistrarUltraSonido
        ultrasonido={ultraSonido}
        embarazada={embarazada}
        onOk={async () => {
          await getUltraSonidos();
          setModalRegistrarUltraSonido(false);
        }}
        open={modalRegistrarUltraSonido}
        onCancel={() => setModalRegistrarUltraSonido(false)}
      />
      <ModalVerUltraSonido
        open={modalVerUltraSonido}
        onCancel={() => setModalVerUltraSonido(false)}
        onOk={() => setModalVerUltraSonido(false)}
        ultrasonido={ultraSonido}
      />
    </Modal>
  );
};

export default ModalVerUltraSonidos;
