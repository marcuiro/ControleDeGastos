using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.ConfiguracaoEntidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleDeGastos.API.Infra.ConfiguracaoEntidades
{
    /// <summary>
    /// Configuração da entidade Transação, herda de BaseEntityConfiguration para configurações básicas
    /// </summary>
    public class TransacaoEF : BaseEntityConfiguration<Transacao>
    {
        public override void Configure(EntityTypeBuilder<Transacao> builder)
        {
            builder.Property(t => t.Descricao)
                .HasMaxLength(400);

            builder.HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .IsRequired()
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(t => t.Categoria)
                .WithMany(p => p.Transacoes)
                .IsRequired()
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
