import Grafico from "../../assets/img/grafico.png"
import TCross from "../../assets/img/t-cross.png"
import Dashb from "../../assets/img/dashb.png"
import Nivus from "../../assets/img/nivus.png"
import Polo from "../../assets/img/polo.png"


import "../Analises/styleanalises.css"
import axios from "axios"
import Perfil from "../../components/Perfil"
import Header from "../../components/Header"
import MenuLateral from "../../components/MenuLateral"
import Status from "../../components/Dashboards/graficoStatus/Status"
import Erros from "../../components/Dashboards/graficoErroPlanta/ErrosPlanta"
import ErrosHome from "../../components/Dashboards/graficoErroPlanta/ErrosPlanta"
import { useEffect, useState } from "react"
import Criticidades from "../../components/Dashboards/graficoCriticidade/Criticidades"
import ErroMes from "../../components/Dashboards/graficoErro/ErroMes"
import ErrosDia from "../../components/Dashboards/graficoErro/ErroDia"
import AlertasHome from "../../components/Dashboards/graficoAlerta/AlertasHome"
import ErrosPeriodo from "../../components/Dashboards/graficoLinha/ErrosPeriodo"
import ErrosMes from "../../components/Dashboards/graficoLinha/ErrosMes"
import ErroDias from "../../components/Dashboards/graficoLinha/ErroDias"
import Texte from "../Texte"
import ErrosPlanta from "../../components/Dashboards/graficoErroPlanta/ErrosPlanta"
import Alertas from "../Alertas"
import Graf from "../Graf/Graf"
import SeletorAlertas from "../SeletorAlertas/SeletorAlertas"



export function Analises() {
    // const [user, setUser] = useState({});

    // const getErros = async () => {
    //     try {
    //         const response = await axios.get(
    //             "http://localhost:8080/usuarios" 
    //         );
    //         const data = response.data;

    //         setUser(data);
    //         // console.log(data);
    //         // console.log(response);
    //     } catch (error) {
    //       console.log(error)  
    //     }
    // };

    //     useEffect(() => {
    //         getUser();
    //     }, []);
    // useEffect(()  => {
    //     axios
    //         .get("http://localhost:8080/usuarios")
    //         .then((response) => console.log(response.data))
    //         .catch((error) => console.log(error))
    //         .finally(console.log("Olá"));
    // }, []);

    const [users, setUsers] = useState([])

    useEffect(() => {
        //função 
        axios.get("http://localhost:8080/usuarios")
            .then((response) => {
                setUsers(response.data)
            })

            .catch(() => {
                console.log("Deu erroado")
            })
    }, [])

    return (
        <>
            <MenuLateral />
            <Perfil />
            <main className="main_analises">
                <section className="titulo_analises">
                    <h1>Análises</h1>
                </section>
                <section className="posicionamento_main_analises">


                    <section className="posicionamento_informacoes">
                        <div className="posicionamento">
                            <section className="posicionamento_barras">
                                <Texte />
                            </section>
                            <div className="linha_horizontal"></div>
                            <section className="posicionamento_graficos">
                                <ErrosPlanta />
                                <div className="linha_vertical"></div>
                                <SeletorAlertas />
                            </section>


                        </div>
                    </section>
                    <section className="responsividade">
                        <div className="posicionamentoesquerda_respon">
                            <div className="respon_esquerdo">
                                <div className="logo_respon">
                                    <img src="./img/logo_preto.png" alt="" />
                                </div>
                                <div className="posicionamentooptions_respon">
                                    <div className="posicionamentoopcao_respon">
                                        <a href="">Listagem</a>
                                        <a href="">Relátorio</a>
                                        <a href="">Mais</a>
                                    </div>
                                    <div className="linha-horizontal1" />
                                </div>
                                <div className="position_respon">
                                    <h1>Performance</h1>
                                </div>
                                <div className="posicionamentoproducao_respon">
                                    <div className="producao_respon">
                                        <div className="esquerdo_respon">
                                            <p>Produção</p>
                                        </div>
                                        <div className="meio_respon">
                                            <div id="linha-vertical" />
                                        </div>
                                        <div className="direito_respon">
                                            <p>000</p>
                                        </div>
                                    </div>
                                    <div className="custo_respon">
                                        <div className="esquerdo_respon">
                                            <p>Custo</p>
                                        </div>
                                        <div className="meio_respon">
                                            <div id="linha-vertical" />
                                        </div>
                                        <div className="direito_respon">
                                            <p>000</p>
                                        </div>
                                    </div>
                                </div>
                                <section className="posicionamentoinformacoes_respon">
                                    <div className="posicionamento_respon">
                                        <div className="posicionamentografico_respon">
                                            <div className="grafimg_respon">
                                                <img src={Grafico} alt="" />
                                            </div>
                                        </div>
                                        <div className="posicionamentocarros_respon">
                                            <div className="demonstrativo_respon">
                                                <div className="demimg_respon">
                                                    <img src={TCross} alt="" />
                                                </div>
                                                <div className="demimg_respon">
                                                    <img src={Dashb} alt="" />
                                                </div>
                                            </div>
                                            <div className="demonstrativo_respon">
                                                <div className="demimg_respon">
                                                    <img src={Nivus} alt="" />
                                                </div>
                                                <div className="demimg_respon">
                                                    <img src={Dashb} alt="" />
                                                </div>
                                            </div>
                                            <div className="demonstrativo_respon">
                                                <div className="demimg_respon">
                                                    <img src={Polo} alt="" />
                                                </div>
                                                <div className="demimg_respon">
                                                    <img src={Dashb} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                    </section>

                </section>
            </main>
        </>
    )
}
