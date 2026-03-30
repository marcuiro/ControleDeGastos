export interface Resposta<T> {
    dados: T,
    sucesso: boolean,
    mensagemErro: string
}