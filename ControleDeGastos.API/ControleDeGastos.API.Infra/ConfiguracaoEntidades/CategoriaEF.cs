using ControleDeGastos.API.Dominio.Models;
using Infraestrutura.ConfiguracaoEntidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleDeGastos.API.Infra.ConfiguracaoEntidades
{
    /// <summary>
    /// Configuração da entidade Categoria, herda de BaseEntityConfiguration para configurações básicas
    /// </summary>
    public class CategoriaEF : BaseEntityConfiguration<Categoria>
    {
        public override void Configure(EntityTypeBuilder<Categoria> builder)
        {
        }
    }
}
