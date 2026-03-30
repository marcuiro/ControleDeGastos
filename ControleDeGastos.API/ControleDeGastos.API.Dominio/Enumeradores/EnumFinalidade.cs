using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeGastos.API.Dominio.Enumeradores
{
    /// <summary>
    /// Enumerador de finalidade pois o dado é estático.
    /// </summary>
    public enum EnumFinalidade
    {
        [Description("Despesa")]
        Despesa,
        [Description("Receita")]
        Receita,
        [Description("Ambas")]
        Ambas
    }
}
