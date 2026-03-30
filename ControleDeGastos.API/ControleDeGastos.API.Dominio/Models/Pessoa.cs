using Infraestrutura.ConfiguracaoEntidades;

namespace ControleDeGastos.API.Dominio.Models
{
    /// <summary>
    /// Entidade Categoria, herda de BaseEntity para ser configurada posteriormente.
    /// </summary>
    public class Pessoa : BaseEntity
    {
        public string Nome { get; set; }
        public int Idade { get; set; }
        public virtual List<Transacao> Transacoes { get; set; }

        public Pessoa() { }
        public Pessoa(string nome, int idade)
        {
            this.Nome = nome;
            this.Idade = idade;
        }
    }
}
