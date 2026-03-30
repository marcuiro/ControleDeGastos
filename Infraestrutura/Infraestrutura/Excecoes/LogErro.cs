using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Excecoes
{
    /// <summary>
    /// Classe que representa os logs de erro serializados.
    /// </summary>
    [Serializable]
    public class LogDeErro
    {
        public DateTime DataHora { get; set; }
        public string Informativo { get; set; }
        public string Mensagem { get; set; }
        public string StackTrace { get; set; }
        public LogDeErro Inner { get; set; }

        public LogDeErro(Exception erro, string informativo = null)
        {
            this.DataHora = DateTime.Now;
            this.Informativo = informativo;
            this.Mensagem = erro?.Message;
            this.StackTrace = erro?.StackTrace;
            this.Inner = erro != null && erro.InnerException != null ? new LogDeErro(erro.InnerException) : null;
        }

        public LogDeErro() { }
    }
}
