using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Excecoes
{
    /// <summary>
    /// Exceção customizada para serialização e armazenamento em arquivos
    /// </summary>
    public class ExcecaoBasica : Exception
    {
        public string Mensagem { get; private set; }
        public Exception ExcecaoInterna { get; private set; }
        public ExcecaoBasica(string mensagem) : base(mensagem)
        {
            this.Mensagem = mensagem;
        }
        public ExcecaoBasica(string mensagem, Exception ex) : base(mensagem, ex)
        {
            this.Mensagem = ex.GetType() == typeof(ExcecaoBasica) ? ((ExcecaoBasica)ex).Mensagem : mensagem;
            this.ExcecaoInterna = ex;

            GerenciadorExcecoes.Publique(ex, mensagem);
        }
    }
}
