import MenuLateral from "../../components/MenuLateral"
import Perfil from "../../components/Perfil"
import "./style.css"

import IconeCards1 from "../../assets/img/pie-chart_3579068.png"
import IconeCards2 from "../../assets/img/pie-chart_4491389.png"
import IconeContato from "../../assets/img/icon-contact.png"
import IconeChat from "../../assets/img/icon-chat.png"

import { useEffect, useState } from "react"
import AlertasHome from "../../components/Dashboards/graficoAlerta/AlertasHome"
import axios from "axios"
import ErrosPeriodo from "../../components/Dashboards/graficoLinha/ErrosPeriodo"
import ErrosPlanta from "../../components/Dashboards/graficoErroPlanta/ErrosPlanta"


export default function Home() {

    const [erro, setErro] = useState([]);
    const [listaAlertas, setListaAlertas] = useState([]);
    const [ListaErros, setListaErros] = useState([]);
    const [ListaErrosResolvidos, setListaErrosResolvidos] = useState([]);
    const [ListaEstrategias, setListaEstrategias] = useState([]);
    
useEffect(() => {
  // Atualiza o título do documento usando a API do browser
  BuscarAlertas()
  BuscarErros()
  BuscarEstrategias()
  
}, []);

function BuscarAlertas(){
    axios
    .get("http://localhost:8080/alertas")
    .then((response) => {
        console.log(response.data)
        setListaAlertas(response.data)

    })
    .catch((error) => console.log(error))
}

function BuscarErros(){
    axios
    .get("http://localhost:8080/erro")
    .then((response) => {
        console.log(response.data)
        setListaErros(response.data.filter( x => x.status_erro != "Solucionado"))
        setListaErrosResolvidos(response.data.filter( x => x.status_erro == "Solucionado"))
        

    })
    .catch((error) => console.log(error))
}

function BuscarEstrategias(){
    axios
    .get("http://localhost:8080/estrategias")
    .then((response) => {
        console.log(response.data)
        setListaEstrategias(response.data)

    })
    .catch((error) => console.log(error))
}

    return (
        <>
            <MenuLateral/>
            <Perfil/>
            <main className="mainHome">
                <section className="titulo_home">
                    <h1>Home</h1>
                </section>
                <section className="section-main-home">
                    <div className="banner-main">
                    </div>
                    <div className="lista-quantidades">
                        <div className="cards-iniciais">
                            <div className="card-inicial">
                                <img src={ IconeCards1 } alt="Icone de erro" />
                                <div className="quantidade">
                                    <span>Quantidade de Erros</span>
                                    <p>{ ListaErros.length + ListaErrosResolvidos.length }</p>
                                </div>
                            </div>
                            <div className="card-inicial">
                                <img src={ IconeCards2 } alt="Icone de erros corrigidos" />
                                <div className="quantidade">
                                    <span>Erros Corrigidos</span>
                                    <p>{ ListaErrosResolvidos.length }</p>
                                </div>
                            </div>
                            <div className="card-inicial">
                                <img src={ IconeCards1 } alt="Icone de alertas" />
                                <div className="quantidade">
                                    <span>Quantidade de Alertas</span>
                                    <p> { listaAlertas.length } </p>
                                </div>
                            </div>
                            <div className="card-inicial">
                                <img src={ IconeCards2 } alt="Icone de estratégias" />
                                <div className="quantidade">
                                    <span>Quantidade de Estratégias</span>
                                    <p>{ ListaEstrategias.length }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="centro">
                        <div className="centro-um">
                            <ErrosPeriodo erroList={erro}/>
                            <div className="linha"></div>
                            <div className="cards-meio">
                                <div className="card-meio">
                                <img src={ IconeContato } alt="Icone de agenda de contato" />
                                    <h3>Contatar planta</h3>
                                    <p>fale com algum responsável que esteja disponível.</p>
                                </div>
                                <div className="card-meio">
                                    <img src={ IconeChat } alt="Icone de chat" />
                                    <h3>Chat com analista</h3>
                                    <p>entre em contato com analistas que estejam disponíveis.</p>
                                </div>
                            </div>
                        </div>
                        <div className="centro-dois">
                            <ErrosPlanta erroList={erro}/>
                            <div className="linha"></div>
                            <AlertasHome/>
                        </div>
                    </div>
                <section className="container-alertas">
                    <h2 className="h2-alertas em-bold">Alertas Registrados</h2>
                    <table className="tb-alertas">
                        <caption className="c-tb-alertas">Alertas de erros</caption>
                        <thead className="thead-alertas">
                            <tr className="tr-alertas">
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Status</th>
                                <th>Nível de criticidade</th>
                                <th>Data</th>
                                
                            </tr>
                        </thead>
                        <tbody id="corpo-tabela">

                        {
                            listaAlertas.map((alerta: any, index: number) => {
                                return <tr className="tr-alertas">
                                <td data-cell="nome" key={index}>{alerta.nomealerta}</td>
                                <td data-cell="descrição" key={index}>{alerta.descricao_alerta}</td>
                                <td data-cell="status" key={index}>{alerta.status_alerta}</td>
                                <td id="centralizar" data-cell="nivel de criticidade" key={index}>{alerta.nivel_criticidade}</td>
                                <td data-cell="data" key={index}>{new Date(alerta.data_alerta).toLocaleDateString()}</td>
                            </tr>
                            })
                    }
                        </tbody>
                    </table>
                </section>
                </section>
            </main>
        </>
    )
}