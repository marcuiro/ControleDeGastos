using Infraestrutura.Arquivos;
using Infraestrutura.Context;
using Infraestrutura.GerenciamentoRepositorio;
using Infraestrutura.Interfaces;
using Infraestrutura.Static;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Infraestrutura.Injection
{
    /// <summary>
    /// Injeção de serviços e iniciação de infraestrutura que deve ser chamada por APIs externa. <br/>
    /// Aqui recebo também a assembly do projeto que injeta a infraestrutura para ser armazenada e usada para construção do banco
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestrutura(this IServiceCollection services, Assembly assembly)
        {
            GerenciadorDeArquivos.Instancia.AdicionarAssembly(assembly.GetName().Name);

            services.AddDbContextFactory<Contexto>(options =>
                options.UseSqlServer(StaticData.DB_CONN_STRING));

            services.AddScoped(typeof(IRepositorio<>), typeof(Repositorio<>));
            services.AddScoped(typeof(ServicoBase<>));
            services.AddScoped<IUnidadeDeTrabalho, UnidadeDeTrabalho>();

            var dbContext = services.BuildServiceProvider()
                .GetRequiredService<Contexto>();

            dbContext.Database.EnsureCreated();

            return services;
        }
    }
}
