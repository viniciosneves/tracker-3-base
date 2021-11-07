import axios, { AxiosInstance } from "axios";
import { store } from "@/store";
import { TipoMutacoes } from "@/store/tipos-mutacoes";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    store.commit(TipoMutacoes.HTTP_START, config.url)
    return config
  },

  (error) => {
    store.commit(TipoMutacoes.HTTP_FINISH, error.config.url)
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use((response) => {
  store.commit('HTTP_FINISH', response.config.url)
  return response
}, (error) => {
  return Promise.reject(error)
})


export default httpClient;