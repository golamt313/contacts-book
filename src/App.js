import './App.css';
import { AuthProvider } from './auth/Auth';
import Login from './auth/Login'

function App() {
return (
  <AuthProvider>
    <Login />
  </AuthProvider>
)};

export default App;
