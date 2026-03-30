using ControleDeGastos.API.Dominio.Interfaces;
using ControleDeGastos.API.Infraestrutura.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.GerenciamentoRepositorio
{
    public class Repositorio<T>(ControleDeGastosDbContext contexto) : IRepositorio<T> where T : class
    {
        public readonly ControleDeGastosDbContext Contexto = contexto;

        public async Task<List<T>> ObtenhaTodos()
            => await Contexto.Set<T>().ToListAsync();

        public async Task<List<T>> ObtenhaTodos(Expression<Func<T, bool>> predicado)
            => await Contexto.Set<T>()
                .Where(predicado)
                .ToListAsync();

        public async Task<T?> ObtenhaUnico(params object[] args)
            => await Contexto.FindAsync<T>(args);

        public async Task<T?> ObtenhaUnico(Expression<Func<T, bool>> predicado)
            => await Contexto.Set<T>().SingleOrDefaultAsync(predicado);

        public async Task Adicione(T objeto)
            => await Contexto.AddAsync(objeto);

        public async Task Adicione(IEnumerable<T> objetos)
            => await Contexto.AddRangeAsync(objetos);

        public async Task Atualize(T objeto)
            => await Task.Run(() => Contexto.Update(objeto));

        public async Task Remova(T objeto)
            => await Task.Run(() => Contexto.Remove(objeto));

        public async Task Remova(IEnumerable<T> objetos)
            => await Task.Run(() => Contexto.RemoveRange(objetos));
    }
}
