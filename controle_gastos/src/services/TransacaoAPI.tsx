import type { Transacao } from "../models/Transacao/Transacao";
import type { TransacaoDTO } from "../DTO/TransacaoDTO"
import { Service } from "./base";
/// <summary>
/// Serviço para chamadas de endpoints de Transacao
/// </summary>
const service = new Service();

export const getTransacoes = async (): Promise<Transacao[]> => {
    return await service.requisicaoGET<Transacao[]>("ObtenhaTransacoes");
};

export const getTransacao = async (id: string): Promise<Transacao> => {
    const parametros: Record<string, string> = { id: id };

    return await service.requisicaoGET<Transacao>("ObtenhaTransacao", parametros);
};

export const adicionarTransacao = async (categoriaId: string, pessoaId: string, descricao: string,
    valor: number, tipo: number): Promise<void> => {
    const transacaoDTO: TransacaoDTO = {
        categoriaId: categoriaId,
        pessoaId: pessoaId,
        descricao: descricao,
        valor: valor,
        tipo: tipo
    };

    await service.requisicaoPOST<TransacaoDTO>("AdicionarTransacao", transacaoDTO);
};

export const removerTransacao = async (id: string): Promise<void> => {
    const parametros: Record<string, string> = { id: id };

    await service.requisicaoDELETE("RemoverTransacao", parametros);
};

export const editarTransacao = async (id: string, categoriaId: string, pessoaId: string, descricao: string,
    valor: number, tipo: number): Promise<void> => {
    const parametros: Record<string, string> = { id: id };
    const transacaoDTO: TransacaoDTO = {
        categoriaId: categoriaId,
        pessoaId: pessoaId,
        descricao: descricao,
        valor: valor,
        tipo: tipo
    };

    await service.requisicaoPUT<TransacaoDTO>("EditarTransacao", transacaoDTO, parametros);
};