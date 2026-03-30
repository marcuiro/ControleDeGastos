using ControleDeGastos.API.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControleDeGastos.API.Infraestrutura.GerenciamentoRepositorio
{
    internal class ServicoBase(IUnidadeDeTrabalho unidadeDeTrabalho) : IServicoBase
    {
        protected IUnidadeDeTrabalho UnidadeDeTrabalho { get; set; } = unidadeDeTrabalho;

        public void Dispose() => 
            this.UnidadeDeTrabalho.Dispose();
    }
}
