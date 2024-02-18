import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// import "./style.css";

interface props {
  errorList: [];
}

function ErrosDia() {
  const [options, setOptions] = useState<any>({
    chart: { id: "basic-bar" },
    xaxis: { categories: [] },
  });
  const [series, setSeries] = useState<any>({ name: "series-1", data: [] });

  useEffect(() => {
    const startDate = new Date(); // Data de início do filtro
    startDate.setDate(startDate.getDate() - 7); // Retrocede 7 dias a partir da data atual
    const endDate = new Date(); // Data de término do filtro

    axios
      .get("http://localhost:8080/plantaerro", {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      .then((response) => {
        const errorsPerPlantPerDay: any = {};

        response.data.forEach((item: any) => {
          const date = new Date(item.date).toLocaleDateString(); // Extrai a data do item e formata para DD/MM/YYYY

          if (!errorsPerPlantPerDay[item.planta.nomeplanta]) {
            errorsPerPlantPerDay[item.planta.nomeplanta] = {};
          }

          if (!errorsPerPlantPerDay[item.planta.nomeplanta][date]) {
            errorsPerPlantPerDay[item.planta.nomeplanta][date] = 0;
          }

          errorsPerPlantPerDay[item.planta.nomeplanta][date]++;
        });

        AlimentarLista(errorsPerPlantPerDay);
      })
      .catch((error) => console.log(error));
  }, []);

  const AlimentarLista = (errorsPerPlantPerDay: any) => {
    const categories: string[] = [];
    const seriesData: number[] = [];

    Object.keys(errorsPerPlantPerDay).forEach((plantName) => {
      categories.push(plantName);

      const data: number[] = [];
      Object.keys(errorsPerPlantPerDay[plantName]).forEach((date) => {
        data.push(errorsPerPlantPerDay[plantName][date]);
      });
      seriesData.push(data);
    });

    setOptions({ ...options, xaxis: { categories } });
    setSeries(
      seriesData.map((data, index) => ({
        name: Object.keys(errorsPerPlantPerDay)[index],
        data,
      }))
    );
  };

  return (
    <div className="app">
      <h2 className="em-bold">Quantidade de erros por planta por dia</h2>
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default ErrosDia;
