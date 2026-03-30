import type { Categoria } from "../Categoria/Categoria";
import type { Pessoa } from "../Pessoas/Pessoa";
/// <summary>
/// Interface de Transacao
/// </summary>
export interface Transacao {
  id: string;
  categoriaId: string;
  pessoaId: string;
  descricao: string;
  valor: number;
  tipo: number;
  categoria: Categoria;
  pessoa: Pessoa
}
