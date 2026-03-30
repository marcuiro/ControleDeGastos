using Infraestrutura.Arquivos;
using System.Xml.Serialization;

namespace Infraestrutura.Excecoes
{
    /// <summary>
    /// Gerenciador das esceções customizadas
    /// </summary>
    public class GerenciadorExcecoes
    {
        private const string DIRETORIO_ERROS = "Erros";

        private static XmlSerializer Serializador = new(typeof(LogDeErro));

        private static string ObtenhaNomeDoArquivo(string nomeArquivo)
        {
            var diretorioDeErros = Path.Combine(GerenciadorDeArquivos.Instancia.ObtenhaDiretorioPadrao(), DIRETORIO_ERROS);

            if (!Directory.Exists(diretorioDeErros))
            {
                Directory.CreateDirectory(diretorioDeErros);
            }

            return Path.Combine(diretorioDeErros, nomeArquivo);
        }

        public static (bool Armazenamento, Nullable<Guid> IdExcecao) Publique(Exception excecao, string informativo = null)
        {
            try
            {
                var erro = new LogDeErro(excecao, informativo);
                var idArquivo = Guid.NewGuid();

                var nomeArquivo = ObtenhaNomeDoArquivo($"{idArquivo}.xml");

                using (var escritor = new StreamWriter(nomeArquivo))
                {
                    Serializador.Serialize(escritor, erro);
                }

                return (true, idArquivo);
            }
            catch
            {
                return (false, null);
            }
        }
    }
}
