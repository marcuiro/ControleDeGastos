using ControleDeGastos.API.Dominio.Enumeradores;
using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.Excecoes;
using Infraestrutura.GerenciamentoRepositorio;
using Infraestrutura.Interfaces;

namespace ControleDeGastos.API.Dominio.Servicos
{
    /// <summary>
    /// Serviço de transações com as regras de negócio, herda de ServicoBase para implementação de procedimentos gerais.
    /// </summary>
    public class ServicoTransacoes(IUnidadeDeTrabalho unidadeDeTrabalho, ServicoPessoas servicoPessoas,
        ServicoCategorias servicoCategorias) : ServicoBase<Transacao>(unidadeDeTrabalho)
    {
        private readonly ServicoPessoas ServicoPessoas = servicoPessoas;
        private readonly ServicoCategorias ServicoCategorias = servicoCategorias;

        public async Task AdicionarTransacao(Guid categoriaId, Guid pessoaId, string descricao, double valor, int tipo)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();
            try
            {
                if (valor < 0)
                    throw new ExcecaoBasica("O valor não pode ser negativo");

                Categoria categoria = await this.ServicoCategorias.ObtenhaUnico(categoriaId);

                if ((int)categoria.Finalidade != tipo)
                    throw new ExcecaoBasica("A finalidade da categoria selecionada não está coerente com o tipo da transação");

                Pessoa pessoa = await this.ServicoPessoas.ObtenhaUnico(pessoaId);

                if (pessoa.Idade < 18 && tipo != (int)EnumFinalidade.Despesa)
                    throw new ExcecaoBasica("A idade da pessoa selecionada não permite esse tipo de transação");

                Transacao transacao = new(categoriaId, pessoaId, valor, tipo)
                {
                    Descricao = descricao
                };

                await base.Adicione(transacao);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao adicionar Transacao", ex);
            }
        }

        public async Task RemoverTransacao(Guid transacaoId)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();
            try
            {
                Transacao transacao = await base.ObtenhaUnico(transacaoId);

                await base.Remova(transacao);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao adicionar Transacao", ex);
            }
        }

        public async Task EditarTransacao(Guid transacaoId, string descricao, double valor, int tipo)
        {
            await base.UnidadeDeTrabalho.InicieTransacao();
            try
            {
                if (valor < 0)
                    throw new ExcecaoBasica("O valor não pode ser negativo");

                Transacao transacao = await base.ObtenhaUnico(transacaoId);
                transacao.Descricao = descricao;
                transacao.Valor = valor;
                transacao.Tipo = (EnumFinalidade)tipo;

                await base.Atualize(transacao);
                await base.UnidadeDeTrabalho.FinalizeTransacao();
            }
            catch (Exception ex)
            {
                await base.UnidadeDeTrabalho.RevertaTransacao();
                throw new ExcecaoBasica("Falha ao adicionar Transacao", ex);
            }
        }
    }
}
