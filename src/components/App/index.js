import { AuthProvider } from '../../contexts/auth';

import Routes from '../../Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
