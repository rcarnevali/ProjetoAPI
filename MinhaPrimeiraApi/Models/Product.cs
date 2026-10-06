using System.ComponentModel.DataAnnotations; // Permite usar as regras de validação
namespace MinhaPrimeiraApi.Models;

public class Product
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome do produto é obrigatório.")]
    [MinLength(2, ErrorMessage = "O nome deve ter pelo menos 2 caracteres.")]
    [MaxLength(100, ErrorMessage = "O nome não pode ter mais de 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Range(0.01, 1000, ErrorMessage = "O preço deve estar entre 0,01 e 1.000.")]
    public decimal Price { get; set; }
}