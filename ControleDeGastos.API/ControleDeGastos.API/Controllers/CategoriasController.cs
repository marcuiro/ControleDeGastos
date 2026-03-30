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
    /// Controller de Categorias
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController(ServicoCategorias servicoCategorias) : CustomControllerBase
    {
        private readonly ServicoCategorias ServicoCategorias = servicoCategorias;

        [HttpGet("/[action]")]
        public async Task<Resposta<IEnumerable<Categoria>>> ObtenhaCategorias()
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    IEnumerable<Categoria> categorias = await this.ServicoCategorias.ObtenhaTodos();
                    return categorias;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpGet("/[action]")]
        public async Task<Resposta<Categoria>> ObtenhaCategoria(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    Categoria categoria = await this.ServicoCategorias.ObtenhaUnico(id);
                    return categoria;
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpPost("/[action]")]
        public async Task<Resposta> AdicionarCategoria([FromBody] CategoriaDTO categoriaDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoCategorias.AdicionarCategoria(categoriaDTO.Descricao, categoriaDTO.Finalidade);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpDelete("/[action]")]
        public async Task<Resposta> RemoverCategoria(Guid id)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoCategorias.RemoverCategoria(id);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }

        [HttpPut("/[action]")]
        public async Task<Resposta> EditarCategoria(Guid id, [FromBody] CategoriaDTO categoriaDTO)
        {
            return await MiddlewareRetorno(async () =>
            {
                try
                {
                    await this.ServicoCategorias.EditarCategoria(id, categoriaDTO.Descricao, categoriaDTO.Finalidade);
                }
                catch (Exception ex)
                {
                    throw new ExcecaoBasica(ex.Message, ex);
                }
            });
        }
    }
}
