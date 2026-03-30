using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Arquivos.Configuracao
{
    /// <summary>
    /// Classe que referencia o arquivo de configuração que armazena as assemblies lidas para construção do banco de dados
    /// </summary>
    [ArquivoDeConfiguracao]
    internal class AssemblyConfig
    {
        public string Name { get; set; }

        public AssemblyConfig() { }
        public AssemblyConfig(string name)
        {
            this.Name = name;
        }
    }
}
