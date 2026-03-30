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
    /// Controller de pessoas
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController(ServicoPessoas servicoPessoas) : CustomControllerBase
    {
        private readonly ServicoPessoas ServicoPessoas = servicoPessoas;

        [HttpGet("/[action]")]
        public async Task<Resposta<IEnumerable<Pessoa>>> ObtenhaPessoas()
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    IEnumerable<Pessoa> pessoas = await this.ServicoPessoas.ObtenhaTodos();
                    return pessoas;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpGet("/[action]")]
        public async Task<Resposta<Pessoa>> ObtenhaPessoa(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    Pessoa pessoa = await this.ServicoPessoas.ObtenhaUnico(id);
                    return pessoa;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpPost("/[action]")]
        public async Task<Resposta> AdicionarPessoa([FromBody] PessoaDTO pessoaDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoPessoas.AdicionarPessoa(pessoaDTO.Nome, pessoaDTO.Idade);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpDelete("/[action]")]
        public async Task<Resposta> RemoverPessoa(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoPessoas.RemoverPessoa(id);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpPut("/[action]")]
        public async Task<Resposta> EditarPessoa(Guid id, [FromBody] PessoaDTO pessoaDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoPessoas.EditarPessoa(id, pessoaDTO.Nome, pessoaDTO.Idade);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

    }
}
