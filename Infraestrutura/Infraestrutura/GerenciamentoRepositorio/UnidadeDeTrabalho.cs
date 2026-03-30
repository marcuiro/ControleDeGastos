using Infraestrutura.ConfiguracaoEntidades;
using Infraestrutura.Context;
using Infraestrutura.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infraestrutura.GerenciamentoRepositorio
{
    /// <summary>
    /// Unidade de trabalho para controlar transações de banco
    /// </summary>
    internal class UnidadeDeTrabalho(Contexto contexto) : IUnidadeDeTrabalho
    {
        private IDbContextTransaction Transaction { get; set; }
        private bool TransacaoAberta { get; set; } = false;

        public Contexto Contexto => contexto;

        private readonly Contexto contexto = contexto;

        public async Task InicieTransacao()
        {
            if (!TransacaoAberta)
            {
                Transaction = await contexto.Database.BeginTransactionAsync();
                TransacaoAberta = true;
            }
        }

        public async Task FinalizeTransacao()
        {
            if (TransacaoAberta)
            {
                await Transaction.CommitAsync();
                await Transaction.DisposeAsync();

                TransacaoAberta = false;
            }
        }

        public async Task RevertaTransacao()
        {
            if (TransacaoAberta)
            {
                await Transaction.RollbackAsync();
                await Transaction.DisposeAsync();

                TransacaoAberta = false;
            }
        }

        public async Task SalveAlteracoes()
        {
            var entries = contexto.ChangeTracker.Entries<BaseEntity>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.Entity.DataCriacao == default)
                    entry.Entity.DataCriacao = DateTime.Now;

                entry.Entity.DataAtualizacao = DateTime.Now;
            }

            await contexto.SaveChangesAsync();
        }

        public void Dispose()
        {
            Transaction?.Dispose();
            contexto.Dispose();
        }
    }
}