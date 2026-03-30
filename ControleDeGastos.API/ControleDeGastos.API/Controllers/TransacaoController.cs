using ControleDeGastos.API.Dominio.Models;
using ControleDeGastos.API.Dominio.Servicos;
using ControleDeGastos.API.DTO;
using Infraestrutura.Controllers;
using Infraestrutura.Excecoes;
using Infraestrutura.Models;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeGastos.API.Controllers
{
    /// <summary>
    /// Controller de transações
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoController(ServicoTransacoes servicoTranscoes) : CustomControllerBase
    {
        private readonly ServicoTransacoes ServicoTransacoes = servicoTranscoes;

        [HttpGet("/[action]")]
        public async Task<Resposta<IEnumerable<Transacao>>> ObtenhaTransacoes()
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    IEnumerable<Transacao> transacoes = await this.ServicoTransacoes.ObtenhaTodos();

                    return transacoes;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica("Falha ao obter transacoes", ex);
                }

            });
        }

        [HttpGet("/[action]")]
        public async Task<Resposta<Transacao>> ObtenhaTransacao(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    Transacao transacao = await this.ServicoTransacoes.ObtenhaUnico(id);

                    return transacao;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica("Falha ao obter transacao", ex);
                }
            });
        }

        [HttpPost("/[action]")]
        public async Task<Resposta> AdicionarTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoTransacoes.AdicionarTransacao(transacaoDTO.CategoriaId.Value, transacaoDTO.PessoaId.Value, transacaoDTO.Descricao,
                        transacaoDTO.Valor, transacaoDTO.Tipo);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica("Falha ao adicionar transacao", ex);
                }
            });
        }

        [HttpPut("/[action]")]
        public async Task<Resposta> EditarTransacao(Guid id, [FromBody] TransacaoDTO transacaoDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoTransacoes.EditarTransacao(id, transacaoDTO.Descricao,
                        transacaoDTO.Valor, transacaoDTO.Tipo);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica("Falha ao editar transacao", ex);
                }
            });
        }

        [HttpDelete("/[action]")]
        public async Task<Resposta> RemoverTransacao(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoTransacoes.RemoverTransacao(id);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica("Falha ao remover transacao", ex);
                }
            });
        }
    }
}
