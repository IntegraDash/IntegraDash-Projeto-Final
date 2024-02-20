import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./style.css";

interface ErrorData {
  data_erro: string;
}

interface ChartData {
  year: number;
  count: number;
}

function ErrosPeriodo() {
  const [chartOptions, setChartOptions] = useState<any>({});
  const [chartSeries, setChartSeries] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<ErrorData[]> = await axios.get<ErrorData[]>("http://localhost:8080/erro");
      const errorCountsByYear = processErrorData(response.data);
      updateChartData(errorCountsByYear);
      setLoading(false);
    } catch (error: AxiosError) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Provide user-friendly error message
      alert("Failed to fetch error data. Please try again later.");
    }
  };

  const processErrorData = (data: ErrorData[]): ChartData[] => {
    const errorCountsByYear: Record<number, number> = {};
    data.forEach((error) => {
      const year = new Date(error.data_erro).getFullYear();
      errorCountsByYear[year] = (errorCountsByYear[year] || 0) + 1;
    });
    return Object.entries(errorCountsByYear).map(([year, count]) => ({ year: parseInt(year), count }));
  };

  const updateChartData = (errorCountsByYear: ChartData[]) => {
    const sortedData = errorCountsByYear.sort((a, b) => a.year - b.year);
    const years = sortedData.map((entry) => entry.year);
    const counts = sortedData.map((entry) => entry.count);
    setChartOptions({ xaxis: { categories: years } });
    setChartSeries([{ name: "series-1", data: counts }]);
  };

  return (
    <div className="app">
      <h2 className="em-bold">Erros notificados por período</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          <div className="mixed-chart-linha">
            <Chart options={chartOptions} series={chartSeries} type="line" width="800" height="400" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrosPeriodo;
