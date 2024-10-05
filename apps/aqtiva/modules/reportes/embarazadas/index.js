import React, { useEffect, useState } from 'react';
import AppRowContainer from '@aqtiva/components/AppRowContainer';
import { Col, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { api } from '@aqtiva/helpers/api';
import dayjs from 'dayjs';
import AppTableContainer from '@aqtiva/components/AppTableContainer';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { MesEnum } from '@aqtiva/constants';
import randomHexColor from 'random-hex-color';
import AppCard from '@aqtiva/components/AppCard';
import AppSelect from '@aqtiva/components/AppSelect';

const ReporteEmbarazadas = () => {
  const dispatch = useDispatch();
  const [datos, setDatos] = useState();
  const { genericGet } = api('', dispatch, setDatos, datos);
  const [year, setYear] = useState(dayjs().get('year'));
  const [filtro, setFiltro] = useState({
    label: 'TODAS',
    value: 'TODAS',
  });
  const [totalesMeses, setTotalesMeses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const color = randomHexColor();

  useEffect(() => {
    genericGet('reportes/embarazadas/conteo', {
      year,
      filtro: filtro.value,
    }).then((resp) => {
      const final = resp.map((res, idx) => ({ index: idx + 1, ...res }));
      let object = {};
      for (let i = 0; i <= 11; i++) {
        object[i] = { conteo: 0 };
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 1; j < 12; j++) {
          object[j].conteo += +final[i][j].conteo;
        }
      }
      const totalesCharts = [];
      for (const objectKey in object) {
        totalesCharts.push({
          name: MesEnum[objectKey],
          value: object[objectKey].conteo,
        });
      }
      totalesCharts[0].color = '#2783E6';
      totalesCharts[1].color = '#E62CB7';
      totalesCharts[2].color = '#73AAE6';
      totalesCharts[3].color = '#E59E21';
      totalesCharts[4].color = '#3BE617';
      totalesCharts[5].color = '#6B27E6';
      totalesCharts[6].color = '#E63E09';
      totalesCharts[7].color = '#9C73E6';
      totalesCharts[8].color = '#17E6B1';
      totalesCharts[9].color = '#7283E0';
      totalesCharts[10].color = '#F772BD';
      totalesCharts[11].color = '#F08F22';
      setTotalesMeses(totalesCharts);
      final.push({ index: 'Total', ...object });
      setDatos(final);
    });
  }, [year, filtro]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={payload.color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={payload.color}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Conteo ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
      payload,
    } = props;
    console.log(payload.payload);
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${payload.payload.name} - ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <AppCard title="Estadisticas embarazadas" fullView>
      <AppRowContainer style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <Col xs={4}>
          <DatePicker.YearPicker
            defaultValue={dayjs().year(year)}
            onChange={(val) => {
              setYear(val?.get('year'));
            }}
          />
        </Col>
        <Col xs={4}>
          <AppSelect
            allowClear={false}
            style={{ width: '100%' }}
            menus={[
              {
                label: 'TODAS',
                value: 'TODAS',
              },
              {
                label: 'SOLO EMBARAZADAS',
                value: 'SOLO_EMBARAZADAS',
              },
              {
                label: 'SOLO POSPARTO',
                value: 'SOLO_POSPARTO',
              },
            ]}
            label={'label'}
            valueKey={'value'}
            defaultValue={filtro}
            onChange={(_, opt) => setFiltro(opt)}
          />
        </Col>
      </AppRowContainer>
      <AppTableContainer
        style={{ margin: '1rem' }}
        columns={[
          {
            key: 0,
            title: 'Semana',
            rowScope: 'row',
            dataIndex: 'index',
          },
          {
            key: 1,
            title: 'Enero',
            render: (item) => item[0].conteo,
          },
          {
            key: 2,
            title: 'Febrero',
            render: (item) => item[1].conteo,
          },
          {
            key: 3,
            title: 'Marzo',
            render: (item) => item[2].conteo,
          },
          {
            key: 4,
            title: 'Abril',
            render: (item) => item[3].conteo,
          },
          {
            key: 5,
            title: 'Mayo',
            render: (item) => item[4].conteo,
          },
          {
            key: 6,
            title: 'Junio',
            render: (item) => item[5].conteo,
          },
          {
            key: 7,
            title: 'Julio',
            render: (item) => item[6].conteo,
          },
          {
            key: 8,
            title: 'Agosto',
            render: (item) => item[7].conteo,
          },
          {
            key: 9,
            title: 'Septiembre',
            render: (item) => item[8].conteo,
          },
          {
            key: 10,
            title: 'Octubre',
            render: (item) => item[9].conteo,
          },
          {
            key: 11,
            title: 'Noviembre',
            render: (item) => item[10].conteo,
          },
          {
            key: 12,
            title: 'Diciembre',
            render: (item) => item[11].conteo,
          },
        ]}
        data={datos}
      />
      <AppRowContainer justify="space-around">
        <Col xs={24}>
          <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height={600}>
              <PieChart width="100%" height="100%">
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={totalesMeses.filter((tm) => tm.value > 0)}
                  cx="50%"
                  cy="50%"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  label={renderCustomizedLabel}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </AppRowContainer>
    </AppCard>
  );
};

export default ReporteEmbarazadas;
