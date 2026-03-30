using Infraestrutura.Static;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infraestrutura.Context
{
    /// <summary>
    /// DesignTimeFactory para construção do banco no build. <br/>
    /// Também foi necessário visto que há entidades externas ao prjeto a serem enviadas a banco
    /// </summary>
    public class ContextoFactory : IDesignTimeDbContextFactory<Contexto>
    {
        public Contexto CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<Contexto>();

            optionsBuilder.UseSqlServer(StaticData.DB_CONN_STRING);

            return new Contexto(optionsBuilder.Options);
        }
    }
}
