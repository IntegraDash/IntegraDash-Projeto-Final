import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

// import './styles.css';

function Graf() {
  const [options, setOptions] = useState<any>({});
  const [series, setSeries] = useState<any[]>([]);
  const [dateRepresentation, setDateRepresentation] = useState<string>('year');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/alertas')
      .then((response) => {
        const filterList: any = [];
        response.data.forEach((item: any) => {
          const date = new Date(item.data_alerta);
          let unitValue: number;
          if (dateRepresentation === 'year') {
            unitValue = date.getFullYear();
          } else if (dateRepresentation === 'month') {
            unitValue = date.getMonth() + 1; // Months are zero indexed
          } else {
            unitValue = date.getDate();
          }
          const positionStatus = filterList.findIndex((st) => st.unit === unitValue);
          if (positionStatus === -1) {
            filterList.push({
              unit: unitValue,
              contagem: 1,
            });
          } else {
            filterList[positionStatus].contagem += 1;
          }
        });
        AlimentarLista(filterList);
      })
      .catch((error) => console.log(error));
  };

  const AlimentarLista = (listaAlertas: any) => {
    const unitValues: any = [];
    const counts: any = [];
    listaAlertas.forEach((item: any) => {
      unitValues.push(item.unit);
      counts.push(item.contagem);
    });
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: unitValues,
      colors: ['#19A755', '#FABC41', '#F90C0C'],
    }));
    setSeries(counts);
  };

  const handleDateRepresentationChange = (representation: string) => {
    setDateRepresentation(representation);
    fetchData();
  };

  return (
    <div className="donut">
      <h2 className="em-bold">Alertas - Status Mensal</h2>
      <div className="buttons-container">
        <button onClick={() => handleDateRepresentationChange('year')}>Ano</button>
        <button onClick={() => handleDateRepresentationChange('month')}>Mês</button>
        <button onClick={() => handleDateRepresentationChange('day')}>Dia</button>
      </div>
      <Chart options={options} series={series} type="donut" width="400" />
    </div>
  );
}

export default Graf;
