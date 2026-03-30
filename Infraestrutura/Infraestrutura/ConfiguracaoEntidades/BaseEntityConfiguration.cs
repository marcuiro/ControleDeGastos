using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestrutura.ConfiguracaoEntidades
{
    /// <summary>
    /// Configuração básica de entidades utilizando EntityFramework e abstração para ser implementada com as particularidades de cada entidade.
    /// </summary>
    public abstract class BaseEntityConfiguration<T> : IEntityTypeConfiguration<T> where T : BaseEntity
    {
        protected BaseEntityConfiguration() { }
        public BaseEntityConfiguration(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(be => be.DataCriacao).IsRequired();
            builder.Property(be => be.DataAtualizacao).IsRequired();

            Configure(builder);
        }

        public abstract void Configure(EntityTypeBuilder<T> builder);
    }
}
