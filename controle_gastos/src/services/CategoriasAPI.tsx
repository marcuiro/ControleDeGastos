import type { Categoria } from "../models/Categoria/Categoria";
import type { CategoriaDTO } from "../DTO/CategoriaDTO"
import { Service } from "./base";
/// <summary>
/// Serviço para chamadas de endpoints de Categoria
/// </summary>
const service = new Service();

export const getCategorias = async (): Promise<Categoria[]> => {
    return await service.requisicaoGET<Categoria[]>("ObtenhaCategorias");
};

export const getCategoria = async (id: string): Promise<Categoria> => {
    const parametros: Record<string, string> = { id: id };

    return await service.requisicaoGET<Categoria>("ObtenhaCategoria", parametros);
};

export const adicionarCategoria = async (descricao: string, finalidade: number): Promise<void> => {
    const categoriaDTO: CategoriaDTO = {
        descricao: descricao,
        finalidade: finalidade
    };

    await service.requisicaoPOST<CategoriaDTO>("AdicionarCategoria", categoriaDTO);
};

export const removerCategoria = async (id: string): Promise<void> => {
    const parametros: Record<string, string> = { id: id };

    await service.requisicaoDELETE("RemoverCategoria", parametros);
};

export const editarCategoria = async (id: string, descricao: string, finalidade: number): Promise<void> => {
    const parametros: Record<string, string> = { id: id };
    const categoriaDTO: CategoriaDTO = {
        descricao: descricao,
        finalidade: finalidade
    };

    await service.requisicaoPUT<CategoriaDTO>("EditarCategoria", categoriaDTO, parametros);
};