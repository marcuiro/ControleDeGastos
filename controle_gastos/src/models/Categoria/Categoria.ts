import type { Transacao } from "../Transacao/Transacao";
/// <summary>
/// Interface de Categoria
/// </summary>
export interface Categoria {
  id: string;
  descricao: string;
  finalidade: number;
  transacoes: Transacao[]
}
