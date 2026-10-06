using MinhaPrimeiraApi.Models;

namespace MinhaPrimeiraApi.Repositories;

public interface IProductRepository
{
    List<Product> GetAll();
    Product? GetById(int id);
    Product Add(Product product);
    void Save();
    void Remove(Product product);
}