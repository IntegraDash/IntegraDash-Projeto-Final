import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

import "./styles.css" 

function AlertasHome() {

  const [options, setOptions] = useState<any>({})
  const [series, setSeries] = useState<any[]>([])

  useEffect(() => {
      // Atualiza o título do documento usando a API do browser
    
    axios
      .get("http://localhost:8080/alertas")
      // .then((response) => setErro(response.data))
      .then((response) => {
          const filterList : any = [];
  
          response.data.map( (item: any) => {
              let positionStatus = filterList.findIndex( (st) => st.status === item.nivel_criticidade);
  
              if( positionStatus == -1){
                filterList.push({
                  status: item.nivel_criticidade,
                  contagem: 1
                })
                  
              }else{
                filterList[positionStatus].contagem += 1
              }
          })
  
          // Chamar a funcao de alimentar os dados
          AlimentarLista( filterList );
      })
      .catch((error) => console.log(error))
  
  
  }, []);


  const AlimentarLista = ( listaAlertas : any ) => {
      
    let testea : any = []
    let testeb : any = []
    listaAlertas.forEach((a, b) => {
      testea.push( a.status )
      testeb.push( a.contagem )
    }); 

    console.log(testea, testeb)

    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: testea,
      colors: ['#fcec4f', '#FF0000', '#FFA500'],
      dataLabels: { 
        enabled: true,
        formatter: function (val: any, opts: any) {
          return `${val.toFixed(1)}%`;
        },
      },
    }));

    setSeries(testeb)

    console.log(JSON.stringify(options) + " options")
  }


  return (
    <div className="donut">
      <h2 className='em-bold'>Alertas</h2>
      <Chart options={options} series={series} type="donut" width="400" />
    </div>
  );

}

export default AlertasHome;
