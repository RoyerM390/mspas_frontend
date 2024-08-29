import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { Button, Col } from 'antd';
import ModalRegistrarPuesto from './ModalRegistrarPuesto';
import { api } from '@aqtiva/helpers/api';
import { useDispatch } from 'react-redux';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import AppMenu from '@aqtiva/components/AppMenu';
import { AiOutlineEdit } from 'react-icons/ai';

const Puestos = () => {
  const [modalRegistrarPuesto, setModalRegistrarPuesto] = useState(false);
  const [puestos, setPuestos] = useState([]);
  const [puesto, setPuesto] = useState(null);
  const dispatch = useDispatch();
  const { get } = api('puestos', dispatch, setPuestos, puestos);

  useEffect(() => {
    get();
  }, []);

  return (
    <AppsContainer fullView title="Puestos" noContentAnimation>
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setPuesto(null);
              setModalRegistrarPuesto(true);
            }}
          >
            Registrar puesto
          </Button>
        </Col>
      </AppRowContainer>
      <AppTableContainer
        data={puestos}
        columns={[
          { key: 1, title: 'Nombre', dataIndex: 'nombre' },
          {
            key: 3,
            title: 'Acciones',
            render: (item) => (
              <AppMenu
                options={[
                  {
                    label: 'Modificar',
                    icon: <AiOutlineEdit />,
                    onClick: () => {
                      setPuesto(item);
                      setModalRegistrarPuesto(true);
                    },
                  },
                ]}
              />
            ),
          },
        ]}
      />
      <ModalRegistrarPuesto
        onOk={async () => {
          await get();
          setModalRegistrarPuesto(false);
          setPuesto(null);
        }}
        onCancel={() => {
          setModalRegistrarPuesto(false);
          setPuesto(null);
        }}
        open={modalRegistrarPuesto}
        puesto={puesto}
      />
    </AppsContainer>
  );
};

export default Puestos;
