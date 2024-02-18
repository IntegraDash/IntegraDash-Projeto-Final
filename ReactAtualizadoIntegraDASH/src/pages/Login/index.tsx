// import api from "../../utils/api";

import api from "../../utils/api"
import secureLocalStorage from "react-secure-storage";
import ImagemFundo from "../../assets/img/imagemfundo.png"
import DesenvolvidoPor from "../../assets/img/desenvolvidopor.png"
import IntegraDashDark from "../../assets/img/integradashdark.png"
// import IntegrdashlogoDescuro from "../../assets/img/integrdashwhite.png"
// import Olho from "../../assets/img/olho.png"

import { useState, } from "react";

// import { Link, useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import {useNavigate, Link} from "react-router-dom"

import "./stylelogin.css";


function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    function fazerlogin(event: any) {
        event.preventDefault()

        const usuario = {
            email: email,
            senha: senha
        }

    //     axios
    //     .get("http://localhost:8080/alertas")
    //     .then((response) => {
    //         console.log(response.data)
    //         setListaAlertas(response.data)
    //     })
    //     .catch((error) => console.log(error))
    // }, []);

    api
    .post("/login", usuario)
            .then((response: any) =>{
                console.log(response.data.idUsuario);

                localStorage.setItem("idUsuario",response.data.idUsuario);

                // console.log(localStorage.getItem("idUsuario"))

                navigate("/home");
                navigate(0);
            })
            .catch((error: any) =>{
                console.log(error);
                alert("Erro ao efetuar o login!");
                
            })
    }

    return (
        <>
            <main className="main_login">
                <section className="login_paginatotal">
                    <div className="login_quadrado_branco">
                        {/* <div class="alinhamento_login"> */}
                        <img
                            className="Logo_Login"
                            src={IntegraDashDark}
                            alt="Logo da Instegradash Fundo Claro"
                        />
                       
                        <div className="teste1">
                            <form onSubmit={fazerlogin} className="alinhamento_input_login" action="login">
                                <label className="negrito" htmlFor="email">
                                    Endereco de email
                                </label>
                                <input
                                    className="login_email"
                                    type="email"
                                    id="email_login"
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Digite aqui seu e-mail:"
                                    required
                                />
                                <label className="negrito" htmlFor="senha">
                                    Senha
                                </label>
                                <div className="zoinho">
                                    <input
                                        className="login_senha"
                                        type="password"
                                        id="senha"
                                        onChange={(event) => setSenha(event.target.value)}
                                        placeholder="Digite aqui sua senha:"
                                        required
                                    />
                                    {/* <img
                                        className="login_zoio"
                                        src={Olho}
                                        alt="mostrar - ocultar password"
                                    /> */}
                                </div>
                                <div className="mantenha-me_login">
                                    <input className="checkbox" type="checkbox" name="checkbox" />
                                    <label htmlFor="">Mantenha-me conectado</label>
                                </div>
                                <button className="login_botao_entrar" type="submit">Entrar</button>
                                <div className="clique_aqui_login">
                                    <p className="testefonte">Esqueceu a senha?</p>
                                    
                                    <Link to={'/restauracao'}>Clique aqui</Link>
                                </div>
                            </form>
                        </div>
                        <div className="desenvolvido">
                            <img
                                className="logindesenvolvido_por"
                                src={DesenvolvidoPor}
                                alt="Desenvolvido por Integradash"
                            />
                        </div>
                    </div>
                    <section className="login_pagina_metade1">
                        <div className="login_rapaz_dashboard">
                            <img src={ImagemFundo} alt="Rapaz em frente a um Dashboard apontando pra ele"/>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
}

export default Login;