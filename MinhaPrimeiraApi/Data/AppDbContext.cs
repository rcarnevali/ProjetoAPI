using Microsoft.EntityFrameworkCore;
using MinhaPrimeiraApi.Models;

namespace MinhaPrimeiraApi.Data;

public class AppDbContext : DbContext // Utiliza os recursos do DbContext fornecido pelo Entity Framework 
// para a classe que organiza a comunicação entre codigo C# e SQLite
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } //Existe um conjunto de dados chamado Products, formado por objetos do tipo Product
}