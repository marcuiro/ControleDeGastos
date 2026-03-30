namespace Infraestrutura.Interfaces
{
    /// <summary>
    /// Interface da unidade de trabalho para uso
    /// </summary>
    public interface IUnidadeDeTrabalho : IDisposable
    {
        Task InicieTransacao();
        Task FinalizeTransacao();
        Task RevertaTransacao();
        Task SalveAlteracoes();
    }
}
