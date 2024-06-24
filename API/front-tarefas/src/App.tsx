import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListarTarefas from "./pages/ListarTarefas";
import CadastrarTarefa from "./pages/CadastrarTarefas";
import AlterarTarefa from "./pages/AlterarTarefa";
import ListarConcluidas from "./pages/ListarConcluidas";
import ListarNaoConcluidas from "./pages/ListarNaoConcluidas";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/tarefa/listar" component={ListarTarefas} />
        <Route path="/tarefa/cadastrar" component={CadastrarTarefa} />
        <Route path="/tarefa/alterar" component={AlterarTarefa} />
        <Route path="/tarefa/listarconcluidas" component={ListarConcluidas} />
        <Route
          path="/tarefa/listarnaoconcluidas"
          component={ListarNaoConcluidas}
        />
      </Switch>
    </Router>
  );
};

export default App;
