import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// pages
import Home from '../pages/Home';

import PassageirosList from '../pages/Fretamentos/Passageiros/List';
import RoteirizacaoPassageiro from '../pages/Fretamentos/Passageiros/Roteirizacao';
import EditarPassageiro from '../pages/Fretamentos/Passageiros/Edit';
import DeletarPassageiro from '../pages/Fretamentos/Passageiros/Delete';

import Dashboard from '../pages/Fretamentos/Dashboard';
import LinhaMapaFromDashboard from '../pages/Fretamentos/Dashboard/LinhasMapa';

export default function ClientRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch
        location={location}
        key={location.pathname}
      >
        <Route path="/" exact component={Home} />

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
