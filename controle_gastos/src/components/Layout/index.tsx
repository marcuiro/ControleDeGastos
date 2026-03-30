import { Outlet } from "react-router-dom";
import { Header } from "../Header";

/// <summary>
/// Layout inicial com Outlet para mapeamento de rotas
/// </summary>
export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}