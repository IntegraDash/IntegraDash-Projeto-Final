import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function LinhaExemplo() {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/alertas");
      const data = response.data;
      const filterList = data.map(item => ({
        status: item.nivel_criticidade,
        year: new Date(item.data_alerta).getFullYear(),
        contagem: 1
      }));

      const uniqueYears = [...new Set(filterList.map(item => item.year))];
      setYears(uniqueYears);

      const filteredData = filterList.filter(item => item.year === parseInt(selectedYear));
      const groupedData = groupByStatus(filteredData);

      AlimentarLista(groupedData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const groupByStatus = (data) => {
    return data.reduce((acc, { status }) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  };

  const AlimentarLista = (data) => {
    const labels = Object.keys(data);
    const counts = Object.values(data);

    const colors = labels.map(status => {
      switch (status) {
        case 'Crítico':
          return '#FF0000'; // Red for "Critico"
        case 'Sério':
          return '#FFA500'; // Orange for "Serio"
        case 'Moderado':
          return '#fcec4f'; // Yellow for "Moderado"
        default:
          return '#000000'; // Default color
      }
    });

    const options = {
      labels,
      colors,
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`
      },
    };

    setOptions(options);
    setSeries(counts);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="donut">
      <div>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Selecione um ano</option>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
      <Chart options={options} series={series} type="donut" width="400" />
    </div>
  );
}

export default LinhaExemplo;
