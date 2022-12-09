import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './pages/login'
import CreditReport from './pages/creditReport'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/reporte_credito/:cedula' element={<CreditReport />} />
      </Routes>
    </Router>
  );
}

export default App;
