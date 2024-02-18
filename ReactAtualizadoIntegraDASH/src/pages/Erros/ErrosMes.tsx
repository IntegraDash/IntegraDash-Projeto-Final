import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// import "./style.css";

function ErrosMes() {
  const [options, setOptions] = useState({
    chart: { id: "basic-bar" },
    xaxis: { categories: [] },
  });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/plantaerro");

      // Contagem de erros por mês e por planta
      const errorsByMonthAndPlant = response.data.reduce((acc, item) => {
        const month = new Date(item.data_erro).toLocaleString('en-US', { month: 'long' });
        const plantName = item.planta.nomeplanta;

        if (!acc[plantName]) {
          acc[plantName] = {};
        }

        acc[plantName][month] = (acc[plantName][month] || 0) + 1;
        return acc;
      }, {});

      // Formata os dados para o gráfico
      const categories = Object.keys(errorsByMonthAndPlant[Object.keys(errorsByMonthAndPlant)[0]] || {});
      const seriesData = Object.keys(errorsByMonthAndPlant).map((plantName) => ({
        name: plantName,
        data: categories.map((month) => errorsByMonthAndPlant[plantName][month] || 0),
      }));

      // Atualiza os dados do gráfico
      updateChartData(categories, seriesData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateChartData = (categories, seriesData) => {
    setOptions({ ...options, xaxis: { categories } });
    setSeries(seriesData);
  };

  return (
    <div className="app">
      <h2 className="em-bold">Quantidade de erros por planta (Mês)</h2>
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
}

export default ErrosMes;
