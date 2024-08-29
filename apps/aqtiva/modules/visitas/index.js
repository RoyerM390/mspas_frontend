import React, { useEffect, useState } from 'react';
import AppsContainer from '@aqtiva/components/AppsContainer';
import { useDispatch } from 'react-redux';
import AppsPagination from '@aqtiva/components/AppsPagination';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { api } from '@aqtiva/helpers/api';
import ModalProgramarVisita from './ModalProgramarVisita';
import { getFormattedDate } from '@aqtiva/helpers';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import {Button, Col, DatePicker, Tag} from 'antd';
import AppSelect from '@aqtiva/components/AppSelect';
const format = 'DD/MM/YYYY';

const Visitas = () => {
  const dispatch = useDispatch();
  const [visitas, setVisitas] = useState([]);
  const { get, genericGet } = api('visitas', dispatch, setVisitas, visitas);
  const [modalRegistrarVisita, setModalRegistrarVisita] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [fechas, setFechas] = useState([null, null]);
  const [empleado, setEmpleado] = useState(null);
  const columns = [
    {
      key: 1,
      title: 'Personal médico',
      dataIndex: 'visitas_embarazadas_encargados',
      render: (visitas) => (
        visitas.map((visita, idx) => (<Tag color='green' key={idx}>{visita.empleados.nombres} {visita.empleados.apellidos}</Tag>))
      )
    },
    {
      key: 2,
      title: 'Paciente',
      dataIndex: 'mujeres_embarazadas',
      render: (paciente) =>
        paciente.nombres + (paciente.apellidos ? ' ' + paciente.apellidos : ''),
    },
    {
      key: 3,
      title: 'CUI',
      dataIndex: 'mujeres_embarazadas',
      render: (paciente) => paciente.cui,
    },
    {
      key: 4,
      title: 'Fecha',
      render: (item) =>
        `${getFormattedDate(item.fecha)} : ${getFormattedDate(
          item.hora,
          'HH:mm'
        )}`,
    },
    {
      key: 5,
      title: 'Nota',
      dataIndex: 'nota'
    }
  ];

  useEffect(() => {
    get();
    genericGet('empleados', dispatch, setEmpleados, empleados);
  }, []);

  return (
    <AppsContainer fullView title="Visitas domiciliares">
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={6}>
          <DatePicker.RangePicker onChange={(fechas) => setFechas(fechas)} format={format} />
        </Col>
        <Col xs={6}>
          <AppSelect
            onChange={(empleado) => setEmpleado(empleado)}
            style={{ width: '100%' }}
            menus={empleados}
            label="nombres"
            concatLabel="apellidos"
            valueKey="id"
          />
        </Col>
        <Col xs={6}>
          <Button
            type="primary"
            ghost
            onClick={() =>
              get({
                fechaInicio:
                  fechas && fechas.length > 0
                    ? fechas[0].utc().local().format()
                    : null,
                fechaFin:
                  fechas && fechas.length > 0
                    ? fechas[1].utc().local().format()
                    : null,
                empleado,
              })
            }
          >
            Buscar
          </Button>
        </Col>
      </AppRowContainer>
      <AppsPagination onChange={(page) => get('', page)} />
      <AppTableContainer data={visitas} columns={columns} />
      <ModalProgramarVisita
        open={modalRegistrarVisita}
        onCancel={() => setModalRegistrarVisita(false)}
      />
    </AppsContainer>
  );
};

export default Visitas;
