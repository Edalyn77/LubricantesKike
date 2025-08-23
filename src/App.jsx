import './styles/App.css'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navBar'
import Footer from './components/footer'
import Whatsapp from './components/whatsapp';

import Inicio from './pages/inicio';
import Servicios from './pages/servicios';
import Marcas from './pages/marcas';
import RegistroVisitas from './pages/registro';
import Contacto from './pages/contacto';
import Galeria from './pages/galeria';
import Admin from './pages/admin';

function Layout({ children }) {
  const location = useLocation();

  // Verifica si la ruta actual es /admin
  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      <Navbar />
      {children}
      {!isAdminRoute && (
        <>
          <Whatsapp />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/registro" element={<RegistroVisitas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
