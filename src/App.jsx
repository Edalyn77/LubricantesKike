import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navBar'
import Footer from './components/footer'
import Whatsapp from './components/whatsapp';

import Inicio from './pages/inicio';
import Servicios from './pages/servicios';
import Marcas from './pages/marcas';
import Registro from './pages/registro';
import Contacto from './pages/contacto';
import Galeria from './pages/galeria';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
      <Whatsapp />
      <Footer />
    </Router>
  );
}

export default App;