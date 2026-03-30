using ControleDeGastos.API.Dominio.Enumeradores;
using Infraestrutura.ConfiguracaoEntidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControleDeGastos.API.Dominio.Models
{
    /// <summary>
    /// Entidade Categoria, herda de BaseEntity para ser configurada posteriormente.
    /// </summary>
    public class Categoria : BaseEntity
    {
        public string Descricao { get; set; }
        public EnumFinalidade Finalidade { get; set; }
        public virtual List<Transacao> Transacoes { get; set; }

        public Categoria() { }

        public Categoria(string descricao, int finalidade)
        {
            this.Descricao = descricao;
            this.Finalidade = (EnumFinalidade)finalidade;
        }
    }
}
