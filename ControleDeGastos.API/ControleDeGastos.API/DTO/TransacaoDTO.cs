using System.ComponentModel.DataAnnotations;

namespace ControleDeGastos.API.DTO
{
    /// <summary>
    /// DTO de transação para ser usada na comunicação entre API e chamadas externas
    /// </summary>
    public class TransacaoDTO
    {
        [Required]
        public Guid? CategoriaId { get; set; }
        [Required]
        public Guid? PessoaId { get; set; }
        public string Descricao { get; set; }
        [Required]
        public double Valor { get; set; }
        [Required]
        public int Tipo { get; set; }
    }
}
