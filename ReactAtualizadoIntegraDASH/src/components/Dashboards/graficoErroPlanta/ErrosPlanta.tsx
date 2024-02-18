import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./style.css"

interface props {
  errorList : []
}

function ErrosPlanta() {

  const [options, setOptions] = useState<any>({ chart: { id: "basic-bar" }, xaxis: { categories: [] } })
  const [series, setSeries] = useState<any>({ name: "series-1", data: [] })

useEffect(() => {
  // Atualiza o título do documento usando a API do browser

  axios
    .get("http://localhost:8080/plantaerro")
    .then((response) => {
        const filterList : any = [];

        response.data.map( (item: any) => {
            let positionPlantaErro = filterList.findIndex( pe => pe.nomeplanta === item.planta.nomeplanta);

            if( positionPlantaErro == -1){
              filterList.push({
                nomeplanta: item.planta.nomeplanta,
                contagem: 1
              })
                
            }else{
              filterList[positionPlantaErro].contagem += 1
            }
        })

        // Chamar a funcao de alimentar os dados
        AlimentarLista( filterList );
        console.log("filterList: " + JSON.stringify(filterList))
    })
    .catch((error) => console.log(error))


}, []);


  const AlimentarLista = ( listaErros : any ) => {
      
    let testea : any = []
    let testeb : any = []
    listaErros.forEach((a, b) => {

      testea.push( a.nomeplanta )
      testeb.push( a.contagem )
    }); 

    setOptions({ ...options, xaxis : { categories : testea}})
    setSeries({ ...series, data : testeb})
  }

  return (
    <div className="app">
      <h2 className="em-bold">Quantidade de erros por planta</h2>
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={[ series ]}
            type="bar"
            width="500" />
        </div>
      </div>
    </div>
  );
}


export default ErrosPlanta;