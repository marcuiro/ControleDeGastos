using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.Excecoes;
using Infraestrutura.GerenciamentoRepositorio;
using Infraestrutura.Interfaces;
using System.Linq.Expressions;

namespace ControleDeGastos.API.Dominio.Servicos
{
    /// <summary>
    /// Serviço de pessoas com as regras de negócio, herda de ServicoBase para implementação de procedimentos gerais.
    /// </summary>
    public class ServicoPessoas(IUnidadeDeTrabalho unidadeDeTrabalho) : ServicoBase<Pessoa>(unidadeDeTrabalho)
    {
        public async Task AdicionarPessoa(string nome, int idade)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Pessoa pessoa = new(nome, idade);

                await this.Adicione(pessoa);

                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao adicionar pessoa", ex);
            }
        }

        public async Task EditarPessoa(Guid id, string nome, int idade)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Pessoa pessoa = await base.ObtenhaUnico(id);
                pessoa.Nome = nome;
                pessoa.Idade = idade;

                await this.Atualize(pessoa);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao editar pessoa", ex);
            }
        }

        public async Task RemoverPessoa(Guid id)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();

            try
            {
                Pessoa pessoa = await base.ObtenhaUnico(id);

                await this.Remova(pessoa);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao remover pessoa", ex);
            }
        }
    }
}
