import "../../pages/Alertas/stylealertas.css"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MenuLateral from "../../components/MenuLateral";
import Perfil from "../../components/Perfil";


import IconeCards1 from "../../assets/img/pie-chart_3579068.png"
import IconeCards2 from "../../assets/img/pie-chart_4491389.png"
import IconeContato from "../../assets/img/icon-contact.png"
import IconeChat from "../../assets/img/icon-chat.png"


function Alertas() {
  const [linhasVisiveis, setLinhasVisiveis] = useState({});
  const [expressao, setExpressao] = useState('');
  const [listaAlertas, setListaAlertas] = useState([]); 
  const [alertasModerado,setListaAlertasModerado] = useState([]); 
  const [alertasSerio,setListaAlertasSerio] = useState([]); 
  const [alertasCritico,setListaAlertasCritico] = useState([]); 
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/alertas")
      .then((response) => {
        console.log(response.data);
        setListaAlertas(response.data);
        setListaAlertasModerado(response.data.filter( x => x.status_alerta == "Moderado"))
        setListaAlertasSerio(response.data.filter( x => x.status_alerta == "Serio"))
        setListaAlertasCritico(response.data.filter( x => x.status_alerta == "Critico"))



      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      setExpressao(e.target.value.toLowerCase());
    };

    const inputBusca = document.getElementById('inputBusca');
    inputBusca.addEventListener('keyup', handleKeyUp);

    return () => {
      inputBusca.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handlePaginaAnterior = () => {
    setPaginaAtual((prev) => Math.max(prev - 1, 1));
  };

  const handlePaginaProxima = () => {
    setPaginaAtual((prev) => Math.min(prev + 1, Math.ceil(listaAlertas.length / itensPorPagina)));
  };

  const paginasTotais = Math.ceil(listaAlertas.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const alertasPagina = listaAlertas.slice(inicio, fim);

  return (
    <>
      <MenuLateral />
      <Perfil />
      <main className="MainAlertas">
        <section className="titulo_analises">
          <h1>Análises</h1>
        </section>
      <section className="section-main-alertas">
        <section className="mainCards">
          <div className="cards">
            <div className="card critico" >
            <img src={ IconeCards1 } alt="Icone de erro" />
              <div className="card-conten">
              <div className="card-name">Erros Criticos</div>

                <div className="number">{alertasCritico.length}</div> 
              </div>
              <div className="icon-box">
                
                <i className="fas fa-user-graduate" />
              </div>
            </div>
            <div className="card urgentes">
            <img src={ IconeCards2 } alt="Icone de erros corrigidos" />
            <div className="card-name">Erros Sério</div>
              <div className="number">{alertasSerio.length}</div> 
              <div className="icon-box">
                <i className="fas fa-chalkboard-teacher" />
              </div>
            </div>
            <div className="card normais">
            <img src={ IconeCards1 } alt="Icone de alertas" />

              <div className="card-conten">
              <div className="card-name">Erros Moderados</div>
                <div className="number">{alertasModerado.length}</div> 
              </div>
              <div className="icon-box">
                <i className="fas fa-users" />
              </div>
            </div>
            </div>
            <div className="card card-body mt-5">
              <h1 className="Nometabela">Gerenciamento de Alertas</h1>
              <input
                id="inputBusca"
                type="text"
                className="form-control mt-3 mb-3"
                placeholder="O que você procura?"
                value={expressao}
                onChange={(e) => setExpressao(e.target.value)}
              />
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Nivel de criticidade</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>identificador do erro relacionado</th>
                  </tr>
                </thead>
                <tbody id="tabela-alertas">
                  {alertasPagina.map((alerta, index) => (
                    <tr className="tr-alertas" key={index}>
                      <td data-cell="nome">{alerta.nomealerta}</td>
                      <td data-cell="descrição">{alerta.descricao_alerta}</td>
                      <td data-cell="status">{alerta.status_alerta}</td>
                      <td data-cell="data">{alerta.data_alerta}</td>
                      <td id="centralizar" data-cell="nivel de criticidade">{alerta.nivel_criticidade}</td>
                      <td data-cell="identificador do erro relacionado">{alerta.erro.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav aria-label="Navegação de página exemplo">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePaginaAnterior}>
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: paginasTotais }, (_, index) => (
                    <li className={`page-item ${paginaAtual === index + 1 ? 'active' : ''}`} key={index}>
                      <button className="page-link" onClick={() => setPaginaAtual(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${paginaAtual === paginasTotais ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePaginaProxima}>
                      Próximo
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            
        </section>
        </section>
      </main>
    </>
  );
}

export default Alertas;