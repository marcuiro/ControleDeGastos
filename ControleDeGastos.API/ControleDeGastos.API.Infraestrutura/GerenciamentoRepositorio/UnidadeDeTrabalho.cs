using ControleDeGastos.API.Dominio.Interfaces;
using ControleDeGastos.API.Infraestrutura.ConfiguracaoDeEntidades.Base;
using ControleDeGastos.API.Infraestrutura.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.GerenciamentoRepositorio
{
    internal class UnidadeDeTrabalho(ControleDeGastosDbContext contexto) : IUnidadeDeTrabalho
    {
        private IDbContextTransaction Transaction { get; set; }
        private bool TransacaoAberta { get; set; } = false;

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