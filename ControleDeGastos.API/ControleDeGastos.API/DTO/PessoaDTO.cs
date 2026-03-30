using System.ComponentModel.DataAnnotations;

namespace ControleDeGastos.API.DTO
{
    /// <summary>
    /// DTO de pessoa para ser usada na comunicação entre API e chamadas externas
    /// </summary>
    public class PessoaDTO
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public int Idade { get; set; }
    }
}
