using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Arquivos
{
    /// <summary>
    /// Atributo para classes que remetem à arquivos de configuração
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class ArquivoDeConfiguracaoAttribute : Attribute
    {
    }
}
