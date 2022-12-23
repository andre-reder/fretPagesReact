import { Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoginPage from '../pages/Login';

function LoginRoute() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Route path="/" component={LoginPage} />
    </AnimatePresence>
  );
}

export default LoginRoute;
