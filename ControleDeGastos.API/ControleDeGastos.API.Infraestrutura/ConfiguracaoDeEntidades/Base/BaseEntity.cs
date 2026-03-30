using System;
using System.Collections.Generic;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.ConfiguracaoDeEntidades.Base
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
