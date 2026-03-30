using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.ConfiguracaoEntidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleDeGastos.API.Infra.ConfiguracaoEntidades
{
    /// <summary>
    /// Configuração da entidade Pessoa, herda de BaseEntityConfiguration para configurações básicas
    /// </summary>
    public class PessoaEF : BaseEntityConfiguration<Pessoa>
    {
        public override void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.Property(p => p.Nome)
                .HasMaxLength(200);
        }
    }
}
