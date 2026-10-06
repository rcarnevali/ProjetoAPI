import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product.model';
import { ProductsService } from './services/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // Lista de produtos
  products = signal<Product[]>([]);

  // Estado da listagem
  loading = signal(false);
  error = signal('');

  // Dados usados para criar ou editar um produto
  newName = '';
  newPrice: number | null = null;

  saving = signal(false);
  editingId: number | null = null;

  // Dados usados na busca por Id
  searchId: number | null = null;

  searchedProduct = signal<Product | null>(null);
  searchingId = signal(false);
  searchError = signal('');

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Busca todos os produtos
  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'Não foi possível carregar os produtos. Verifique se a API está em execução.'
        );

        this.loading.set(false);
      }
    });
  }

  // Cria um produto ou salva uma edição
  saveProduct(): void {

    // Verifica se nome e preço são válidos
    if (
      !this.newName.trim() ||
      this.newPrice === null ||
      this.newPrice <= 0
    ) {
      this.error.set(
        'Informe um nome válido e um preço maior que zero.'
      );

      return;
    }

    // Limpa erros anteriores
    this.error.set('');

    // Monta o produto com os dados informados no formulário
    const product = {
      name: this.newName.trim(),
      price: this.newPrice
    };

    // Se existe um Id sendo editado, fazemos PUT
    if (this.editingId !== null) {

      // Confirma a alteração antes de salvar
      const confirmed = confirm(
        `Deseja salvar as alterações do produto "${product.name}"?`
      );

      if (!confirmed) return;

      // Indica que o produto está sendo salvo
      this.saving.set(true);

      this.productsService
        .update(this.editingId, product).subscribe({
          next: () => {

            // Fecha o formulário e limpa os campos
            this.cancelEdit();

            this.saving.set(false);

            // Atualiza a lista
            this.loadProducts();
          },
          error: () => {

            // Exibe uma mensagem se a atualização falhar
            this.error.set(
              'Não foi possível atualizar o produto. Verifique se a API está em execução.'
            );
            this.saving.set(false);
          }
        });
      return;
    }

    // Se não existe Id sendo editado, fazemos POST
    this.saving.set(true);

    this.productsService.create(product).subscribe({
      next: () => {

        // Limpa o formulário depois de criar o produto
        this.newName = '';
        this.newPrice = null;

        // Finaliza o salvamento e fecha o pop-up
        this.saving.set(false);
        this.productFormOpen.set(false);

        // Atualiza a lista
        this.loadProducts();
      },
      error: () => {

        // Exibe uma mensagem se o cadastro falhar
        this.error.set(
          'Não foi possível criar o produto. Verifique se a API está em execução.'
        );

        this.saving.set(false);
      }
    });
  }

  productFormOpen = signal(false);

  openNewProduct(): void {
    this.editingId = null;
    this.newName = '';
    this.newPrice = null;
    this.error.set('');
    this.productFormOpen.set(true);
  }

  // Preenche o formulário com os dados do produto escolhido
  editProduct(product: Product): void {

    // Guarda o Id do produto que está sendo editado
    this.editingId = product.id;

    // Preenche os campos com os dados atuais
    this.newName = product.name;
    this.newPrice = product.price;

    this.error.set('');

    // Abre o pop-up
    this.productFormOpen.set(true);
  }

  // Cancela a edição
  cancelEdit(): void {
    this.editingId = null;
    this.newName = '';
    this.newPrice = null;
    this.productFormOpen.set(false);
  }

  // Remove um produto pelo Id
  deleteProduct(id: number): void {

    // Busca o produto na lista para mostrar o nome na confirmação
    const product = this.products().find(
      (product) => product.id === id
    );

    // Confirma se o usuário deseja excluir o produto
    const confirmed = confirm(
      `Deseja realmente excluir o produto "${product?.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.error.set('');

    this.productsService.delete(id).subscribe({
      next: () => {

        // Remove o produto também da lista exibida na tela
        this.products.update((list) =>
          list.filter((product) => product.id !== id)
        );

        // Cancela a edição se o produto removido estiver sendo editado
        if (this.editingId === id) {
          this.cancelEdit();
        }
      },
      error: () => {

        // Exibe uma mensagem se a exclusão falhar
        this.error.set(
          'Não foi possível remover o produto. Verifique se a API está em execução.'
        );
      }
    });
  }

  // Busca produto específico pelo Id
  searchProductById(): void {
    if (this.searchId === null || this.searchId < 1) {
      this.searchError.set('Informe um Id válido para buscar.');
      return;
    }

    this.searchError.set('');
    this.searchedProduct.set(null);
    this.searchingId.set(true);

    this.productsService.getById(this.searchId).subscribe({
      next: (product) => {
        this.searchedProduct.set(product);
        this.searchingId.set(false);
      },
      error: () => {
        this.searchError.set('Produto não encontrado.');
        this.searchingId.set(false);
      }
    });
  }

  // Limpa o resultado da busca por Id
  clearSearch(): void {
    this.searchId = null;
    this.searchedProduct.set(null);
    this.searchError.set('');
  }
}