using ControleDeGastos.API.Infra;
using ControleDeGastos.API.Initialization;
using Infraestrutura.Injection;

namespace ControleDeGastos.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSwaggerGen();

            /// <summary>
            /// Chamada da infraestrutura passando qual a assembly deste projeto que será usada no momento de construção do banco
            /// </summary>
            builder.Services.AddInfraestrutura(typeof(IAssemblyIdentifier).Assembly);
            builder.Services.AddServices();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

            var app = builder.Build();

            /// <summary>
            /// Liberação de cors apenas para ambiente local e de testes
            /// </summary>
            app.UseCors("AllowAll");
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapGet("/", context =>
            {
                context.Response.Redirect("/swagger");
                return Task.CompletedTask;
            });

            app.Run();
        }
    }
}
