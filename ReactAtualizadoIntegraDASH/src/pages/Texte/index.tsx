import React, { useState, ReactElement, useEffect } from 'react';
import ErrosPeriodo from '../../components/Dashboards/graficoLinha/ErrosPeriodo';
import ErroDias from '../../components/Dashboards/graficoLinha/ErroDias';
import ErroMes from '../../components/Dashboards/graficoErro/ErroMes';
import ErrosDia from '../../components/Dashboards/graficoErro/ErroDia';
import ErrosMes from '../../components/Dashboards/graficoLinha/ErrosMes';

import "../Texte/styletexte.css"

const App: React.FC = () => {
  const [componenteSelecionado, setComponenteSelecionado] = useState<ReactElement | null>(null);

  const handleSelecionarComponente = (componente: ReactElement) => {
    console.log(componente)
    setComponenteSelecionado(componente);
  };

  useEffect(() => {
    handleSelecionarComponente(<ErrosPeriodo />)
  }, [])

  return (
    <section>
      <div className='posicionamento_btn'>
        <button className='btn_graf' onClick={() => handleSelecionarComponente(<ErrosPeriodo />)}>
          Ano
        </button>
        <button className='btn_graf' onClick={() => handleSelecionarComponente(<ErrosMes />)}>
          Mês
        </button>
        <button className='btn_graf' onClick={() => handleSelecionarComponente(<ErroDias />)}>
          Dia
        </button>
      </div>
      <div>
        {componenteSelecionado}
      </div>
    </section>
  );
};

export default App;
