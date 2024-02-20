import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./style.css";

interface ErrorData {
  data_erro: string;
}

interface ChartData {
  year: number;
  month: number;
  count: number;
}

function ErrosPeriodo() {
  const [chartOptions, setChartOptions] = useState<any>({});
  const [chartSeries, setChartSeries] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<ErrorData[]>("http://localhost:8080/erro");
      const errorCountsByMonth = processErrorData(response.data);
      updateChartData(errorCountsByMonth);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      alert("Failed to fetch error data. Please try again later.");
    }
  };

  const processErrorData = (data: ErrorData[]): ChartData[] => {
    const errorCountsByMonth: ChartData[] = [];
    const yearsSet = new Set<number>();

    data.forEach((error) => {
      const date = new Date(error.data_erro);
      const year = date.getFullYear();
      yearsSet.add(year);

      const month = date.getMonth();
      const existingEntry = errorCountsByMonth.find((entry) => entry.year === year && entry.month === month);
      if (existingEntry) {
        existingEntry.count++;
      } else {
        errorCountsByMonth.push({ year, month, count: 1 });
      }
    });

    setYears(Array.from(yearsSet).sort());

    return errorCountsByMonth;
  };

  const updateChartData = (errorCountsByMonth: ChartData[]) => {
    const yearsData = {};
    errorCountsByMonth.forEach((entry) => {
      if (!yearsData[entry.year]) {
        yearsData[entry.year] = Array.from({ length: 12 }, () => 0);
      }
      yearsData[entry.year][entry.month] = entry.count;
    });

    const seriesData = Object.entries(yearsData).map(([year, counts], index) => ({
      name: year,
      data: counts,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color
    }));

    setChartOptions({
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    });
    setChartSeries(seriesData);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedYear(selectedYear);
  };

  return (
    <div className="app">
      <h2 className="em-bold_erro">Erros notificados por período</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select className="select" onChange={handleYearChange} value={selectedYear || ""}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="row">
            <div className="mixed-chart-linha">
              <Chart
                options={chartOptions}
                series={selectedYear ? chartSeries.filter((series: any) => series.name === selectedYear.toString()) : []}
                type="line"
                width="800"
                height="400"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ErrosPeriodo;
