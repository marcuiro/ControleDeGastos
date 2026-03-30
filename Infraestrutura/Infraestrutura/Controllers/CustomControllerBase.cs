using Infraestrutura.Excecoes;
using Infraestrutura.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Controllers
{
    ///<summary>
    ///ControllerBase Custom para controlar o retorno dos endpoints para uma classe genérica conhecida
    ///</summary>
    public abstract class CustomControllerBase : ControllerBase
    {
        protected async Task<Resposta<T>> MiddlewareRetorno<T>(Func<Task<T>> retorno) where T : class
        {
            try
            {
                var resultado = await retorno();

                return new Resposta<T>
                {
                    Sucesso = true,
                    Dados = resultado,
                    MensagemErro = null
                };
            }
            catch (Exception ex)
            {
                GerenciadorExcecoes.Publique(ex);

                return new Resposta<T>
                {
                    Sucesso = false,
                    Dados = null,
                    MensagemErro = ex.Message
                };
            }
        }

        protected async Task<Resposta> MiddlewareRetorno(Func<Task> retorno)
        {
            try
            {
                await retorno();

                return new Resposta
                {
                    Sucesso = true,
                    MensagemErro = null
                };
            }
            catch (Exception ex)
            {
                GerenciadorExcecoes.Publique(ex);

                return new Resposta
                {
                    Sucesso = false,
                    MensagemErro = ex.Message
                };
            }
        }
    }
}
