using Infraestrutura.Context;
using Infraestrutura.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infraestrutura.GerenciamentoRepositorio
{
    /// <summary>
    /// Repositório com procedimentos gerais em banco
    /// </summary>
    internal class Repositorio<T>(Contexto contexto) : IRepositorio<T> where T : class
    {
        internal readonly Contexto Contexto = contexto;

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
