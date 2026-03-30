using Infraestrutura.Arquivos.Configuracao;
using Ninject.Infrastructure.Language;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infraestrutura.Arquivos
{
    /// <summary>
    /// Gerenciamento geral de arquivos. <br/>
    /// Aqui foi usada a pasta temp local para que não popule a máquina de quem for responsável por avaliar o código
    /// </summary>
    public class GerenciadorDeArquivos
    {
        private static GerenciadorDeArquivos _Instancia = null;
        private static object padLock = new object();
        public static GerenciadorDeArquivos Instancia
        {
            get
            {
                lock (padLock)
                {
                    _Instancia ??= new GerenciadorDeArquivos();

                    return _Instancia;
                }
            }
        }

        private GerenciadorDeArquivos() { }

        public string ObtenhaDiretorioPadrao()
        {
            return Path.Combine(Path.GetTempPath(), "Arquivos");
        }

        public T ObtenhaArquivoDeConfiguracao<T>() where T : class
        {
            try
            {
                var tipoParaValidacao = typeof(T);

                if (typeof(T) != typeof(string) &&
                    typeof(System.Collections.IEnumerable).IsAssignableFrom(typeof(T)))
                {
                    if (typeof(T).IsGenericType)
                    {
                        tipoParaValidacao = typeof(T).GetGenericArguments().First();
                    }
                }

                if (!tipoParaValidacao.HasAttribute<ArquivoDeConfiguracaoAttribute>())
                    return null;


                string fileContent = File.ReadAllText(Path.Combine(ObtenhaDiretorioPadrao(), $"{tipoParaValidacao.Name}.json"));

                return JsonSerializer.Deserialize<T>(fileContent);
            }
            catch
            {
                return null;
            }
        }

        public string ObtenhaCaminhoDoArquivo(string nomeArquivo, string diretorio = null)
        {
            var diretorioDestino = diretorio == null ? ObtenhaDiretorioPadrao() : Path.Combine(ObtenhaDiretorioPadrao(), diretorio);

            if (!Directory.Exists(diretorioDestino))
            {
                Directory.CreateDirectory(diretorioDestino);
            }

            return Path.Combine(diretorioDestino, nomeArquivo);
        }

        public string ArmazeneArquivoDeTexto(string texto, string nomeArquivo = null, string diretorio = null)
        {
            string _nomeArquivo = string.IsNullOrEmpty(nomeArquivo) ? Guid.NewGuid().ToString() : nomeArquivo;

            FileInfo arquivo = new FileInfo(this.ObtenhaCaminhoDoArquivo(_nomeArquivo, diretorio));

            File.WriteAllText(arquivo.FullName, texto, Encoding.UTF8);

            return _nomeArquivo;
        }

        public void AdicionarAssembly(string nomeAssembly)
        {
            List<AssemblyConfig> assemblies = [];
            string assemblyFileName = $"{nameof(AssemblyConfig)}.json";
            var caminho = ObtenhaCaminhoDoArquivo(assemblyFileName);

            if (!File.Exists(caminho))
                ArmazeneArquivoDeTexto(JsonSerializer.Serialize(assemblies), assemblyFileName);

            assemblies = ObtenhaArquivoDeConfiguracao<List<AssemblyConfig>>();

            if (assemblies == null)
                return;

            if (assemblies.Any(a => a.Name.Equals(nomeAssembly, StringComparison.CurrentCultureIgnoreCase)))
                return;

            assemblies.Add(new AssemblyConfig(nomeAssembly));

            ArmazeneArquivoDeTexto(JsonSerializer.Serialize(assemblies), assemblyFileName);
        }
    }
}
