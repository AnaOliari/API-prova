import React, { useEffect, useState } from "react";
import { listarTarefas, alterarTarefa, Tarefa } from "../models/tarefaAPI";

const AlterarTarefa: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    listarTarefas()
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar as tarefas:", error);
      });
  }, []);

  const handleAlterarStatus = (id: number) => {
    alterarTarefa(id)
      .then(() => {
        alert("Status da tarefa alterado com sucesso!");
        setTarefas(
          tarefas.map((tarefa) =>
            tarefa.id === id
              ? {
                  ...tarefa,
                  status:
                    tarefa.status === "Não iniciada"
                      ? "Em andamento"
                      : "Concluída",
                }
              : tarefa
          )
        );
      })
      .catch((error) => {
        console.error("Houve um erro ao alterar o status da tarefa:", error);
      });
  };

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>
                <button onClick={() => handleAlterarStatus(tarefa.id)}>
                  Alterar Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlterarTarefa;
