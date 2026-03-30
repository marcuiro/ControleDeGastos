using ControleDeGastos.API.Dominio.Models;
using ControleDeGastos.API.Infraestrutura.ConfiguracaoDeEntidades.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InfraTest
{
    public class CategoriaEF : BaseEntityConfiguration<Categoria>
    {
        public override void Configure(EntityTypeBuilder<Categoria> builder)
        {
        }
    }
}
