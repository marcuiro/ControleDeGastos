namespace Infraestrutura.Models
{
    /// <summary>
    /// Tipo geral de resposta que será usada em controllers
    /// </summary>
    public class Resposta<T> where T : class
    {
        public T Dados { get; set; }
        public bool Sucesso { get; set; }
        public string MensagemErro { get; set; }
    }

    public class Resposta
    {
        public object? Dados { get; set; }
        public bool Sucesso { get; set; }
        public string MensagemErro { get; set; }
    }
}
