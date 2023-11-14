import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/restaurantes/AdministracaoRestaurtantes';
import FormularioRestaurante from './paginas/Administracao/restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/pratos/FormularioPrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes/>} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante/>} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante/>} />
        <Route path="pratos" element={<AdministracaoPratos/>} />
        <Route path="pratos/novo" element={<FormularioPrato/>} />
        <Route path="pratos/:id" element={<FormularioPrato/>} />
      </Route>

    </Routes>
  );
}

export default App;
