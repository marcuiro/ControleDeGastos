import {  createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css'
import { Home } from './components/Home';
import { routes } from './routes';
import "../src/components/global.css"
import { Layout } from './components/Layout';

/// <summary>
/// Chamada de Layout com Router para mapeamento de rotas e layout da tela inicial
/// </summary>

const routeObjects =
    routes.map((r): RouteObject => (
        {
            path: r.path,
            element: r.component
        }
    ));

routeObjects.push({
    path: "/",
    element: <Home />,
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: routeObjects,
    },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
