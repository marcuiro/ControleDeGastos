using System.ComponentModel.DataAnnotations;

namespace ControleDeGastos.API.DTO
{
    /// <summary>
    /// DTO de categoria para ser usada na comunicação entre API e chamadas externas
    /// </summary>
    public class CategoriaDTO
    {
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int Finalidade { get; set; }
    }
}
