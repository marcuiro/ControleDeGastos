using Infraestrutura.Interfaces;

namespace Infraestrutura.ConfiguracaoEntidades
{
    /// <summary>
    /// Classe que será herdada por entidades que irão para banco armazenando propriedades gerais.
    /// </summary>
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
