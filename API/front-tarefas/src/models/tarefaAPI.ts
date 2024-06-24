import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5273/api",
});

export const listarTarefas = () => api.get("/tarefa/listar");
export const cadastrarTarefa = (tarefa: NovaTarefa) =>
  api.post("/tarefa/cadastrar", tarefa);
export const listarCategorias = () => api.get("/categoria/listar");
export const alterarTarefa = (id: number) => api.patch(`/tarefa/alterar/${id}`);
export const listarTarefasConcluidas = () => api.get("/tarefa/concluidas");
export const listarTarefasNaoConcluidas = () =>
  api.get("/tarefa/naoconcluidas");

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  categoriaId: number;
  dataCriacao: string;
}

export interface NovaTarefa {
  titulo: string;
  descricao: string;
  status: string;
  categoriaId: number;
}

export interface Categoria {
  id: number;
  nome: string;
}
