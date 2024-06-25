import React, { useEffect, useState } from "react";
import {
  listarCategorias,
  cadastrarTarefa,
  Categoria,
  NovaTarefa,
} from "../models/tarefaAPI";

const CadastrarTarefa: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | undefined>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    listarCategorias()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar as categorias:", error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const novaTarefa: NovaTarefa = {
      titulo,
      descricao,
      status: "Não iniciada",
      categoriaId: categoriaId || 0,
    };
    cadastrarTarefa(novaTarefa)
      .then(() => {
        alert("Tarefa cadastrada com sucesso!");
        setTitulo("");
        setDescricao("");
        setCategoriaId(undefined);
      })
      .catch((error) => {
        console.error("Houve um erro ao cadastrar a tarefa:", error);
      });
  };

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarTarefa;
