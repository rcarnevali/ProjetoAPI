using MinhaPrimeiraApi.Data;
using MinhaPrimeiraApi.Models;

namespace MinhaPrimeiraApi.Repositories;

// qualquer classe que seja um Repository de produtos deve saber fazer estas operações
public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context; // variável para guardar o acesso ao banco

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public List<Product> GetAll() // Buscar todos
    {
        return _context.Products.ToList(); // Representa os produtos no banco
    }

    public Product? GetById(int id) // Buscar pelo ID
    {
        return _context.Products
            .FirstOrDefault(product => product.Id == id);
    }

    public Product Add(Product product) // Adicionar
    {
        _context.Products.Add(product);
        _context.SaveChanges(); // comando que efetivamente grava as mudanças no SQLite
        return product;
    }

    public void Save()
    {
        _context.SaveChanges();
    }

    public void Remove(Product product) // Remover
    {
        _context.Products.Remove(product); // Primeiro indicamos qual produto remover
        _context.SaveChanges(); // Depois gravamos a alteração
    }
}