using ControleDeGastos.API.Dominio.Enumeradores;
using Infraestrutura.ConfiguracaoEntidades;

namespace ControleDeGastos.API.Dominio.Models
{
    /// <summary>
    /// Entidade Categoria, herda de BaseEntity para ser configurada posteriormente.
    /// </summary>
    public class Transacao : BaseEntity
    {
        public Guid CategoriaId { get; set; }
        public Guid PessoaId { get; set; }
        public string Descricao { get; set; }
        public double Valor { get; set; }
        public EnumFinalidade Tipo { get; set; }
        public virtual Categoria Categoria { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        public Transacao() { }

        public Transacao(Guid categoriaId, Guid pessoaId, double valor, int tipo)
        {
            this.CategoriaId = categoriaId;
            this.PessoaId = pessoaId;
            this.Valor = valor;
            this.Tipo = (EnumFinalidade)tipo;
        }
    }
}
