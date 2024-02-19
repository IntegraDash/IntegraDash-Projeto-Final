import "./styleestrategia.css"
import api from "../../utils/api"
import Pasta from "../../assets/img/folder-icon.png"
import MenuLateral from "../../components/MenuLateral"
import Header from "../../components/Header"
import Perfil from "../../components/Perfil"
// import { useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios"

export default function Estrategia() {

  // const [id_usuario, setUsuario] = useState<string>("")
  const [id_erro, setErro] = useState<any[]>([]);
  const [id_iderro, setidErro] = useState<string>("")
  const [nomeestrategia, setNome] = useState<string>("")
  const [data_estrategia, setData] = useState<string>("")
  const [descricao_estrategia, setDescricao] = useState<string>("")
  const [listaEstrategias, setListaEstrategias] = useState([]);

  const [valorSelecionado, setValorSelecionado] = useState('');

  const [modalData, setModalData] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);


  const id_usuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    axios
    .get("http://localhost:8080/estrategias")
    .then((response) => {
        console.log(response.data)
        setListaEstrategias(response.data)

    })
    .catch((error) => console.log(error))
    
  }, []);

  function listarerro() {
    // get para criar listar os erros daquele usuario
    api.get("erro")
      .then((response: any) => {
        // console.log(response.data);
        // console.log(response.data.nomeerro);
        setErro(response.data)
        setidErro(response.data)

      })
      .catch((error: any) => {
        console.log("Error ao realizar um requisição:", error);
      })
  }

  useEffect(() => {
    //executa uma ação após o componente ser recarregado
    listarerro();
  }, [])
  // console.log(aa)
  function cadastrarEstrategia(event: any) {
    event.preventDefault();

    // const formData = new FormData()
    const formData = {
      "id_erro": id_iderro,
      "id_usuario": id_usuario,
      "nomeestrategia": nomeestrategia,
      "data_estrategia": data_estrategia,
      "descricao_estrategia": descricao_estrategia

    }



    // post para criar novas estategias]
    api.post("estrategias", formData)
      .then((response: any) => {
        console.log(response);
        alert("Estratégia cadastrada com sucesso!");
      })
      .catch((error: any) => {
        console.log(error);
        console.log(id_iderro);
        alert("Falha ao cadastrar uma nova estratégia");
      })

  }

  function descricaoestrategia(id: any) {
    api.get("erro/" + id)
      .then((response: any) => {
        // console.log(response.data.descricao_erro);
        // console.log(response.data.nomeerro);
        // const aaa = response.data.descricao_erro;
        setModalData(response.data); // Define os dados do modal com os dados da API
        setShowModal(true); // Exibe o modal
      })
      .catch((error: any) => {
        console.log(id)
        console.log("Error ao realizar um requisição:", error);
      })
  }

  return (
    <>
      <MenuLateral />
      <Perfil />
      <main className="mainHome">
        <section className="titulo_estrategias">
          <h1>Estratégias</h1>
        </section>
        <section className="section-main">
          <div className="container container_cad">
            <div className="cad_conteudo">
              {/* <h1>Cadastro</h1> */}
              {/* <hr/> */}
              <form onSubmit={cadastrarEstrategia} className="cad_formulario_estrategia" method="POST">
                <div className="cad_linha_select">
                  <span>Selecione um erro para adicionar:</span>
                  <select
                    name=""
                    id="cad_select_erro"
                    onChange={(e) => { setidErro(e.target.value); descricaoestrategia(e.target.value); }}
                    defaultValue={"Selecione"}
                  >
                    <option disabled value="Selecione">Selecione</option>
                    {
                      id_erro.map((erro: any, index_erro: number) => {
                        return <option key={index_erro} value={erro.id}>Erro: {erro.nomeerro}</option>
                      })
                    }
                  </select>



                </div>

                {/* Modal */}
                {showModal && (
                  <div className="desc">
                    <div className="desc-content">
                      {modalData && (
                        <>
                          <h2>Detalhes do erro</h2>
                          <p>Nome: {modalData.nomeerro}</p>
                          <p>Descrição: {modalData.descricao_erro}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="cad_box_input">
                  <label htmlFor="nome">Nome da Estratégia:</label>
                  <input
                    type="text"
                    id="nome_estrategia"
                    onChange={(event) => { setNome(event.target.value) }}
                    placeholder="Digite aqui o nome da estratégia:"
                    required
                  />
                </div>
                <div className="cad_box_input">
                  <label htmlFor="descricao">Descrição:</label>
                  <input
                    type="text"
                    id="descricao_estrategia"
                    onChange={(event) => { setDescricao(event.target.value) }}
                    placeholder="Digite aqui a descrição da estratégia:"
                    required
                  />

                </div>
                <div className="cad_box_input">
                  <label htmlFor="date">Data:</label>
                  <input
                    type="date"
                    id="date"
                    onChange={(event) => { setData(event.target.value) }}
                    placeholder="Selecione a data da estratégial:"
                    required
                  />
                </div>
                <button type="submit" className="cad_botao">Cadastrar</button>
              </form>
            </div>
          </div>
          <section className="container-estrategias">
            <h2 className="h2-alertas em-bold">Estratégias Registrados</h2>
            <table className="tb-estrategias">
              <thead className="thead-estrategias">
                <tr className="tr-estrategias">
                  <th className="th_nome">Nome da Estratégia</th>
                  <th className="th_descricao">Descrição</th>
                  <th className="th_data">Data do Cadastro</th>
                </tr>
              </thead>
              <tbody id="corpo-tabela">

                {
                  listaEstrategias.map((estrategias: any, index: number) => {
                    return <tr className="tr-estrategias">
                      <td data-cell="nome" key={index}>{estrategias.nomeestrategia}</td>
                      <td data-cell="descrição" key={index}>{estrategias.descricao_estrategia}</td>
                      <td data-cell="data" key={index}>{new Date(estrategias.data_estrategia).toLocaleDateString()}</td>
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