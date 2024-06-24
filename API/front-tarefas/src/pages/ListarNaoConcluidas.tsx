import React, { useEffect, useState } from "react";
import { listarTarefasNaoConcluidas, Tarefa } from "../models/tarefaAPI";

const ListarNaoConcluidas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    listarTarefasNaoConcluidas()
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => {
        console.error(
          "Houve um erro ao buscar as tarefas não concluídas:",
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>Tarefas Não Concluídas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>{new Date(tarefa.dataCriacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarNaoConcluidas;
