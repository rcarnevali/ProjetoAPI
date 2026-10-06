using MinhaPrimeiraApi.Models;

namespace MinhaPrimeiraApi.Services;

public interface IProductService
{
    List<Product> GetAll();
    Product? GetById(int id);
    Product Create(Product product);
    Product? Update(int id, Product data);
    bool Delete(int id);
}