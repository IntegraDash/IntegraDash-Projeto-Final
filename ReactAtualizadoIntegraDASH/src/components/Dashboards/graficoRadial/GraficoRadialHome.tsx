import Chart from "react-apexcharts"


function GraficoRadialHome(props) {

    const series = [70];
    const options = {
          chart: {
            // height: 50,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels: ['Cricket'],
    };


      return (

        <div id="chart">
          <Chart 
              options={options} 
              series={series} 
              type="radialBar" 
              height={50} 
              width={50}
          />
        </div>

      );
    }

export default GraficoRadialHome;