import type { Transacao } from "../Transacao/Transacao";
/// <summary>
/// Interface de Pessoa
/// </summary>
export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
  transacoes: Transacao[]
}
