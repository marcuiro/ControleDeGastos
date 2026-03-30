using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Infraestrutura.Interfaces
{
    /// <summary>
    /// Interface do repositório para uso
    /// </summary>
    public interface IRepositorio<T>
    {
        Task<List<T>> ObtenhaTodos();
        Task<List<T>> ObtenhaTodos(Expression<Func<T, bool>> predicado);
        Task<T?> ObtenhaUnico(params object[] args);
        Task<T?> ObtenhaUnico(Expression<Func<T, bool>> predicado);
        Task Adicione(T objeto);
        Task Adicione(IEnumerable<T> objetos);
        Task Atualize(T objeto);
        Task Remova(T objeto);
        Task Remova(IEnumerable<T> objetos);
    }
}
