using Infraestrutura.Arquivos;
using Infraestrutura.Arquivos.Configuracao;
using Infraestrutura.Static;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;

namespace Infraestrutura.Context
{
    /// <summary>
    /// Configuração de contexto
    /// </summary>
    public class Contexto(DbContextOptions<Contexto> options) : DbContext(options)
    {
        readonly List<AssemblyConfig> Assemblies = GerenciadorDeArquivos.Instancia.ObtenhaArquivoDeConfiguracao<List<AssemblyConfig>>() ?? [];

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var assembly in Assemblies)
                modelBuilder.ApplyConfigurationsFromAssembly(Assembly.Load(assembly.Name));
        }
    }
}
