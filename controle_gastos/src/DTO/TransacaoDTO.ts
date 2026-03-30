/// <summary>
/// DTO para comunicação com API
/// </summary>
export interface TransacaoDTO {
  categoriaId: string;
  pessoaId: string;
  descricao: string;
  valor: number;
  tipo: number;
}
