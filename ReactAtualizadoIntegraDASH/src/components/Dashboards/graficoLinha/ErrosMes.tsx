import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./style.css"

interface props {
  errorList : []
}

function ErrosMes() {

  const [options, setOptions] = useState<any>({ chart: { id: "basic-bar" }, xaxis: { categories: [] } })
  const [series, setSeries] = useState<any>({ name: "series-1", data: [] })

useEffect(() => {
  // Atualiza o título do documento usando a API do browser

  axios
    .get("http://localhost:8080/erro")
    // .then((response) => setErro(response.data))
    .then((response) => {
        const filterList : any = [];

        response.data.map( (item: any) => {
            let positionError = filterList.findIndex( er => er.ano == item.data_erro.split(`-`)[1]);

            if( positionError == -1){
              // contagemItem.push(erro[ positionError ].contagem += 1)
              filterList.push({
                ano: parseInt(item.data_erro.split(`-`)[1]),
                contagem: 1
              })
                
            }else{
              filterList[positionError].contagem += 1
            }
        })

        // Chamar a funcao de alimentar os dados
        AlimentarLista( filterList );
    })
    .catch((error) => console.log(error))


}, []);

  const AlimentarLista = ( listaErros : any ) => {

    listaErros.sort((a: any, b: any) => a.ano - b.ano);
      
    let testea : any = []
    let testeb : any = []
    listaErros.forEach((a, b) => {

      testea.push( a.ano )
      testeb.push( a.contagem )
    }); 

    setOptions({ ...options, xaxis : { categories : testea}})
    setSeries({ ...series, data : testeb})
  }

    return (
      <div className="app">
        <h2 className="em-bold">Erros notificados por período</h2>
        <div className="row">
          <div className="mixed-chart-linha">
            <Chart
              options={options}
              series={[series]}
              type="line"
              width="800"
              height="400"
            />
          </div>
        </div>
      </div>
    );

    }

export default ErrosMes;