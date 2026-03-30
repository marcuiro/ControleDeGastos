import type { Pessoa } from "../models/Pessoas/Pessoa";
import type { PessoaDTO } from "../DTO/PessoaDTO"
import { Service } from "./base";
/// <summary>
/// Serviço para chamadas de endpoints de Pessoa
/// </summary>
const service = new Service();

export const getPessoas = async (): Promise<Pessoa[]> => {
    return await service.requisicaoGET<Pessoa[]>("ObtenhaPessoas");
};

export const getPessoa = async (id: string): Promise<Pessoa> => {
    const parametros: Record<string, string> = { id: id };

    return await service.requisicaoGET<Pessoa>("ObtenhaPessoa", parametros);
};

export const adicionarPessoa = async (nome: string, idade: number): Promise<void> => {
    const pessoaDTO: PessoaDTO = {
        nome: nome,
        idade: idade
    };

    await service.requisicaoPOST<PessoaDTO>("AdicionarPessoa", pessoaDTO);
};

export const removerPessoa = async (id: string): Promise<void> => {
    const parametros: Record<string, string> = { id: id };

    await service.requisicaoDELETE("RemoverPessoa", parametros);
};

export const editarPessoa = async (id: string, nome: string, idade: number): Promise<void> => {
    const parametros: Record<string, string> = { id: id };
    const pessoaDTO: PessoaDTO = {
        nome: nome,
        idade: idade
    };

    await service.requisicaoPUT<PessoaDTO>("EditarPessoa", pessoaDTO, parametros);
};