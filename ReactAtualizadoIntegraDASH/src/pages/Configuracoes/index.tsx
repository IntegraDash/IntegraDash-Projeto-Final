import "./styleconfiguracoes.css"

import Perfil from "../../components/Perfil"
import PerfilImg from "../../assets/img/user.png"
import MenuLateral from "../../components/MenuLateral"
import api from "../../utils/api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Configuracoes() {

    const [senha, setSenha] = useState<string>("")
    const [usuarios, setListaUsuarios] = useState({})

    const idUsuario = localStorage.getItem("idUsuario");

    useEffect(() => {

        get()

    }, [senha]);

    function atualizarUsuario(event: any) {
        event.preventDefault();
        editar()
    }

    // function editar() {
    //     api.put(`usuarios/208740ef-6f70-4e73-9a4b-0fc912875321`).then((response) => {
    //         console.log(response.data)
    //         setListaUsuarios({
    //             ...usuarios,
    //             "senha":senha
    //         })
    //         alert("foiiiii")
    //     }).catch((error: any) => {
    //         console.log(error)
    //         //console.log(data_estrategia)
    //     })
    // }

    function editar() {
        api.put(`usuarios/${idUsuario}`, usuarios)
            .then((response) => {
                console.log(response.data);
                alert("Atualização bem-sucedida");
            })
            .catch((error: any) => {
                console.error('Erro na requisição PUT:', error);
            });
    }

    async function get() {

        await api.get(`usuarios/${idUsuario}`).then((response) => {
            setListaUsuarios(response.data)
            setSenha(response.data.password)
        })


    }
    return (
        <>
            <MenuLateral />
            <Perfil />
            <section className="main_pageconfig">
                <section className="titulo_configuracoes">
                    <h1>Configurações</h1>
                </section>
                <section className="main_Config">
                    <div className="config-geral">
                        <div className="perfil">
                            <div className="perfil-fte">
                                <img src={PerfilImg} alt="Foto de perfil usuário" />
                                <div className="span-perfil">
                                    <span>{usuarios.nomeusuario}</span>
                                    <span>{usuarios.email}</span>
                                </div>
                            </div>
                            <Link to="/home">
                                <span className="sair-config">Cancelar e ir para Home</span>
                            </Link>
                        </div>
                        <form onSubmit={atualizarUsuario} className="infos-perfil">
                            <div className="txt-perfil">
                                    <div className="lbl-input">
                                        <label htmlFor="nome">Nome</label>
                                        <input
                                            className="input-config"
                                            type="text"
                                            name="nome"
                                            id="nome"
                                            onChange={z =>
                                                setListaUsuarios({
                                                    ...usuarios,
                                                    "nomeusuario": z.target.value
                                                })
                                            }
                                            value={usuarios.nomeusuario} />
                                    </div>
                                    <div className="lbl-input">
                                        <label htmlFor="email">Email</label>
                                        <input className="input-config" type="email" name="email" id="email" value={usuarios.email}
                                            onChange={(e) => {
                                                setListaUsuarios({
                                                    ...usuarios,
                                                    "email": e.target.value
                                                })
                                            }} />
                                    </div>

                                    <div className="lbl-input">
                                        <label htmlFor="tel">Telefone</label>
                                        <input className="input-config" type="text" name="tel" id="tel" value={usuarios.telefone}
                                            onChange={(event) => {
                                                setListaUsuarios({
                                                    ...usuarios,
                                                    "telefone": event.target.value
                                                })
                                            }} />
                                    </div>

                                    {/* <div className="lbl-input">
                                        <label htmlFor="id">ID</label>
                                        <input className="input-config" type="text" name="id" id="id" value={usuarios.id}/>
                                    </div> */}
                                <div className="div-perfil-config">
                                </div>

                                {/* <div className="div-perfil-config">
                                    
                                </div> */}
                            </div>
                            <button type="submit" className="config_button">salvar</button>
                        </form>
                    </div>
                </section>
            </section>
        </>
    )
}
export default Configuracoes