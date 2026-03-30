import Categorias from '../pages/Categorias';
import Pessoas from '../pages/Pessoas'
import Transacoes from '../pages/Transacao';
/// <summary>
/// Mapeamento de rotas para as páginas respectivas
/// </summary>
export const routes = [
  {
    path: "/pessoas/gerenciar",
    component: <Pessoas />
  },
  {
    path: "/categorias/gerenciar",
    component: <Categorias />
  },
  {
    path: "/transacoes/gerenciar",
    component: <Transacoes />
  }
];
