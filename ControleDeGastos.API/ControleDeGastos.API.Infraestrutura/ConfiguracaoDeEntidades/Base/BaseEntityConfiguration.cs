using ControleDeGastos.API.Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.ConfiguracaoDeEntidades.Base
{
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
