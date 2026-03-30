import type { Resposta } from "../../models/Resposta/Resposta";
import { Notificacao } from "../../utils/Notificacao/Notificacao";

export const getAPIAddress = (resource: string): string => {
    return (
        `https://localhost:7253/${resource}`
    );
};
/// <summary>
/// Serviço de chamada para API
/// </summary>
export class Service {
    async requisicaoGET<T>(resource: string, params?: Record<string, string>): Promise<T> {
        var url = getAPIAddress(resource);

        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return this.responseMiddleware((await response.json()) as Resposta<T>);
    }

    async requisicaoPOST<T>(resource: string, body: T, params?: Record<string, string>): Promise<void> {
        var url = getAPIAddress(resource);

        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        this.responseMiddleware((await response.json()) as Resposta<T>);
    }

    async requisicaoPUT<T>(resource: string, body: T, params?: Record<string, string>): Promise<void> {
        var url = getAPIAddress(resource);

        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        this.responseMiddleware((await response.json()) as Resposta<T>);
    }

    async requisicaoDELETE(resource: string, params: Record<string, string>): Promise<void> {
        var url = getAPIAddress(resource);

        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.responseMiddleware((await response.json()) as Resposta<void>);
    }

    private responseMiddleware<T>(response: Resposta<T>) : T{
        if (!response.sucesso && response.mensagemErro){
            Notificacao.erro(response.mensagemErro)
            throw Error();
        }

        return response.dados;
    }
}