using ControleDeGastos.API.Dominio.Servicos;
using Infraestrutura.Interfaces;

namespace ControleDeGastos.API.Initialization
{
    /// <summary>
    /// Mapeamento de serviços criados para injeção de dependências
    /// </summary>
    public static class CustomServices
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ServicoCategorias>();
            services.AddScoped<ServicoPessoas>();
            services.AddScoped<ServicoTransacoes>();

            return services;
        }
    }
}
