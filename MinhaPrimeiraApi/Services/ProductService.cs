using MinhaPrimeiraApi.Models;
using MinhaPrimeiraApi.Repositories;

namespace MinhaPrimeiraApi.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public List<Product> GetAll()
    {
        return _repository.GetAll();
    }

    public Product? GetById(int id)
    {
        return _repository.GetById(id);
    }

    public Product Create(Product product)
    {
        product.Id = 0;
        product.Name = product.Name.Trim();

        return _repository.Add(product);
    }

    public Product? Update(int id, Product data)
    {
        var product = _repository.GetById(id);

        if (product is null) return null;

        product.Name = data.Name.Trim();
        product.Price = data.Price;

        _repository.Save();

        return product;
    }

    public bool Delete(int id)
    {
        var product = _repository.GetById(id);

        if (product is null) return false;

        _repository.Remove(product);

        return true;
    }
}