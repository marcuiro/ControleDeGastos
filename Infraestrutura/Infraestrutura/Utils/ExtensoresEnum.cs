using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Utils
{
    /// <summary>
    /// Método para obter o atributo de descrição de enumeradores. <br />
    /// Idealmente poderia ser implementada uma estrutura com identificadores, descrição e demais propriedades para enumeradores.
    /// </summary>
    public static class ExtensoresEnum
    {
        public static string ObtenhaDescricao(this Enum enumerador)
        {
            if (enumerador == null)
            {
                return string.Empty;
            }

            FieldInfo fieldInfo = enumerador.GetType()
                .GetField(enumerador.ToString());

            return fieldInfo?
                .GetCustomAttributes(typeof(DescriptionAttribute), false)
                .SingleOrDefault() is not DescriptionAttribute attribute ? enumerador.ToString() : attribute.Description;
        }
    }
}
