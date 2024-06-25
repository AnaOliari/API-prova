import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListarTarefas from "./pages/ListarTarefas";
import CadastrarTarefa from "./pages/CadastrarTarefas";
import AlterarTarefa from "./pages/AlterarTarefa";
import ListarConcluidas from "./pages/ListarConcluidas";
import ListarNaoConcluidas from "./pages/ListarNaoConcluidas";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tarefa/listar" element={<ListarTarefas />} />
        <Route path="/tarefa/cadastrar" element={<CadastrarTarefa />} />
        <Route path="/tarefa/alterar" element={<AlterarTarefa />} />
        <Route path="/tarefa/listarconcluidas" element={<ListarConcluidas />} />
        <Route
          path="/tarefa/listarnaoconcluidas"
          element={<ListarNaoConcluidas />}
        />
      </Routes>
    </Router>
  );
};

export default App;
