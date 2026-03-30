using ControleDeGastos.API.Dominio.Enumeradores;
using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.Excecoes;
using Infraestrutura.GerenciamentoRepositorio;
using Infraestrutura.Interfaces;

namespace ControleDeGastos.API.Dominio.Servicos
{
    /// <summary>
    /// Serviço de categorias com as regras de negócio, herda de ServicoBase para implementação de procedimentos gerais.
    /// </summary>
    public class ServicoCategorias(IUnidadeDeTrabalho unidadeDeTrabalho) : ServicoBase<Categoria>(unidadeDeTrabalho)
    {
        public async Task AdicionarCategoria(string descricao, int finalidade)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Categoria categoria = new(descricao, finalidade);

                await this.Adicione(categoria);

                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica(ex.Message, ex);
            }
        }

        public async Task EditarCategoria(Guid id, string descricao, int finalidade)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Categoria categoria = await base.ObtenhaUnico(id);
                categoria.Descricao = descricao;
                categoria.Finalidade = (EnumFinalidade)finalidade;

                await this.Atualize(categoria);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica(ex.Message, ex);
            }
        }

        public async Task RemoverCategoria(Guid id)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Categoria categoria = await base.ObtenhaUnico(id);

                await this.Remova(categoria);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica(ex.Message, ex);
            }
        }
    }
}
