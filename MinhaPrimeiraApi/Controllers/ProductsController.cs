using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Models;
using MinhaPrimeiraApi.Services;

namespace MinhaPrimeiraApi.Controllers;

[ApiController]
[Route("api/[controller]")] // Substituído automaticamente pelo nome do Controller sem a palavra Controller

public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }
    // Contador de Ids começamdo em 1

    [HttpGet] // Este método será executado quando alguém fizer uma requisição GET
    public ActionResult<List<Product>> GetAll() //devolver todos os produtos cadastrados.
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id:int:min(1)}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _service.GetById(id);

        if (product is null) return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create([FromBody] Product product)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var created = _service.Create(product);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }

    [HttpPut("{id:int:min(1)}")]
    public ActionResult<Product> Update(int id, [FromBody] Product data)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        //Procure na lista Products o primeiro produto cujo Id seja igual ao id recebido na URL.
        var updated = _service.Update(id, data);

        if (updated is null) return NotFound(); //Se não encontrar, retorne NotFound

        return Ok(updated);
    }

    [HttpDelete("{id:int:min(1)}")]
    public IActionResult Delete(int id)
    {
        var deleted = _service.Delete(id);

        if (!deleted) return NotFound();

        return NoContent();
    }
}