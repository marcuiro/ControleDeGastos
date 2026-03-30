using Infraestrutura.Interfaces;
using System.Linq.Expressions;

namespace Infraestrutura.GerenciamentoRepositorio
{
    /// <summary>
    /// Servico base com procedimentos gerais que deve ser herdado por serviços que farão a gerência de entidades.
    /// </summary>
    public class ServicoBase<T>(IUnidadeDeTrabalho unidadeDeTrabalho) where T : class
    {
        protected readonly IUnidadeDeTrabalho UnidadeDeTrabalho = unidadeDeTrabalho;
        protected readonly IRepositorio<T> Repositorio = new Repositorio<T>((unidadeDeTrabalho as UnidadeDeTrabalho).Contexto);

        public async Task<List<T>> ObtenhaTodos() => await this.Repositorio.ObtenhaTodos();
        public async Task<List<T>> ObtenhaTodos(Expression<Func<T, bool>> predicado) => await this.Repositorio.ObtenhaTodos(predicado);
        public async Task<T?> ObtenhaUnico(params object[] args) => await this.Repositorio.ObtenhaUnico(args);
        public async Task<T?> ObtenhaUnico(Expression<Func<T, bool>> predicado) => await this.Repositorio.ObtenhaUnico(predicado);

        public async Task Adicione(T objeto)
        {
            await this.Repositorio.Adicione(objeto);
            await this.UnidadeDeTrabalho.SalveAlteracoes();
        }

        public async Task Adicione(IEnumerable<T> objetos)
        {
            await this.Repositorio.Adicione(objetos);
            await this.UnidadeDeTrabalho.SalveAlteracoes();
        }

        public async Task Atualize(T objeto)
        {
            await this.Repositorio.Atualize(objeto);
            await this.UnidadeDeTrabalho.SalveAlteracoes();
        }

        public async Task Remova(T objeto)
        {
            await this.Repositorio.Remova(objeto);
            await this.UnidadeDeTrabalho.SalveAlteracoes();
        }

        public async Task Remova(IEnumerable<T> objetos)
        {
            await this.Repositorio.Remova(objetos);
            await this.UnidadeDeTrabalho.SalveAlteracoes();
        }

        public void Dispose() =>
            this.UnidadeDeTrabalho.Dispose();
    }
}
