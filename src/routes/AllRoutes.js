import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// pages
import Home from '../pages/Home';

import Linhas from '../pages/Fretamentos/Linhas/List';
import NovaLinha from '../pages/Fretamentos/Linhas/Create';
import EditarLinha from '../pages/Fretamentos/Linhas/Edit';
import DeletarLinha from '../pages/Fretamentos/Linhas/Delete';
import LinhaMapa from '../pages/Fretamentos/Linhas/Mapa';
import ShapePost from '../pages/Fretamentos/Linhas/ShapePost';

import VeiculosList from '../pages/Fretamentos/Veiculos/List';
import VeiculoQrCode from '../pages/Fretamentos/Veiculos/QrCode';
import NovoVeiculo from '../pages/Fretamentos/Veiculos/Create';
import EditarVeiculo from '../pages/Fretamentos/Veiculos/Edit';
import DeletarVeiculo from '../pages/Fretamentos/Veiculos/Delete';

import UsuariosList from '../pages/Usuarios/List';
import NovoUsuario from '../pages/Usuarios/Create';
import EditarUsuario from '../pages/Usuarios/Edit';
import DeletarUsuario from '../pages/Usuarios/Delete';

import PassageirosList from '../pages/Fretamentos/Passageiros/List';
import RoteirizacaoPassageiro from '../pages/Fretamentos/Passageiros/Roteirizacao';
import EditarPassageiro from '../pages/Fretamentos/Passageiros/Edit';
import DeletarPassageiro from '../pages/Fretamentos/Passageiros/Delete';

import Dashboard from '../pages/Fretamentos/Dashboard';
import LinhaMapaFromDashboard from '../pages/Fretamentos/Dashboard/LinhasMapa';

export default function AllRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch
        location={location}
        key={location.pathname}
      >
        <Route path="/" exact component={Home} />

        <Route path="/linhas" exact component={Linhas} />
        <Route path="/linhas/novo" exact component={NovaLinha} />
        <Route path="/linhas/edit" exact component={EditarLinha} />
        <Route path="/linhas/delete" exact component={DeletarLinha} />
        <Route path="/linhas/mapa" exact component={LinhaMapa} />
        <Route path="/linhas/shape" exact component={ShapePost} />

        <Route path="/veiculos" exact component={VeiculosList} />
        <Route path="/veiculos/qrCode" exact component={VeiculoQrCode} />
        <Route path="/veiculos/novo" exact component={NovoVeiculo} />
        <Route path="/veiculos/edit" exact component={EditarVeiculo} />
        <Route path="/veiculos/delete" exact component={DeletarVeiculo} />

        <Route path="/usuarios" exact component={UsuariosList} />
        <Route path="/usuarios/novo" exact component={NovoUsuario} />
        <Route path="/usuarios/edit" exact component={EditarUsuario} />
        <Route path="/usuarios/delete" exact component={DeletarUsuario} />

        <Route path="/passageiros" exact component={PassageirosList} />
        <Route path="/passageiros/roteirizacao" exact component={RoteirizacaoPassageiro} />
        <Route path="/passageiros/edit" exact component={EditarPassageiro} />
        <Route path="/passageiros/delete" exact component={DeletarPassageiro} />

        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/linhaMapa" exact component={LinhaMapaFromDashboard} />
      </Switch>
    </AnimatePresence>
  );
}
