import axios from "axios"

// const apiUrl = 'http://localhost:8080/';

// export const obterDadosDaAPI = async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao obter dados da API:', error);
//       throw error;
//     }
//   };

const api = axios.create({
  baseURL: "http://localhost:8080/",
})

export default api