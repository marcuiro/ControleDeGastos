using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.Contexto
{
    public class ControleDeGastosDbContext : DbContext
    {
        public ControleDeGastosDbContext(DbContextOptions<ControleDeGastosDbContext> options) : base(options) { }
        public ControleDeGastosDbContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
