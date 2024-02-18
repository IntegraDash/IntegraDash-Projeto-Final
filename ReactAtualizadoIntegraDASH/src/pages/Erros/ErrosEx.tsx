import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// import "./style.css";

interface PlantError {
  planta: {
    nomeplanta: string;
  };
}

function ErrosEx() {
  const [options, setOptions] = useState<any>({
    chart: { id: "basic-bar" },
    xaxis: { categories: [] },
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
  });
  const [series, setSeries] = useState<any>({ name: "series-1", data: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<PlantError[]>("http://localhost:8080/plantaerro")
      .then((response) => {
        const errorCountMap: Map<string, number> = new Map();

        response.data.forEach((item) => {
          const plantName = item.planta.nomeplanta;
          errorCountMap.set(plantName, (errorCountMap.get(plantName) || 0) + 1);
        });

        const categories = Array.from(errorCountMap.keys());
        const data = Array.from(errorCountMap.values());

        setOptions({ ...options, xaxis: { categories } });
        setSeries([{ data }]);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h2 className="em-bold">Quantidade de erros por planta</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          <div className="mixed-chart">
            <Chart options={options} series={series} type="bar" width="500" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrosEx;
