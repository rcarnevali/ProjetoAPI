# ProjetoAPI

Este repositório reúne, em um único projeto, o **back-end em .NET/C#** e o **front-end em Angular** de uma aplicação de produtos.

O objetivo do trabalho é demonstrar a integração entre a interface Angular, a API .NET e o banco SQLite. Pela tela é possível:

- listar produtos;
- buscar por Id;
- adicionar;
- editar;
- remover.

A estrutura principal é:

```text
ProjetoAPI/
├── MinhaPrimeiraApi/   # API .NET/C#
├── products-front/     # Front-end Angular
├── .gitignore
└── .gitattributes
```

## Instalações necessárias

É necessário ter .NET SDK, Node.js e npm instalados.

Caso o Angular CLI ainda não esteja instalado:

```powershell
npm install -g @angular/cli
```

Caso a ferramenta do Entity Framework ainda não esteja instalada:

```powershell
dotnet tool install --global dotnet-ef
```

O DBeaver é opcional e pode ser usado para visualizar diretamente o banco SQLite.

## Como executar

Abra a pasta `ProjetoAPI` no VS Code.

No painel inferior, abra um terminal em:

```text
Terminal > New Terminal
```

Depois clique no botão **Split Terminal** no canto superior direito do painel do terminal. Isso cria dois terminais lado a lado.

Use um para o back-end e outro para o front-end.

### Terminal 1 — API .NET

Na raiz `ProjetoAPI`:

```powershell
cd MinhaPrimeiraApi
dotnet restore
dotnet ef database update
dotnet run
```

A API roda em:

```text
http://localhost:5050
```

O Swagger fica disponível em:

```text
http://localhost:5050/swagger
```

O Swagger permite testar diretamente as operações da API.

### Terminal 2 — Angular

Na raiz `ProjetoAPI`:

```powershell
cd products-front
npm install
ng serve
```

Se o PowerShell bloquear o comando `ng`, use:

```powershell
npx ng serve
```

A interface fica disponível em:

```text
http://localhost:4200
```

Os dois terminais devem continuar rodando ao mesmo tempo para que o Angular consiga acessar a API.

## Qual endereço usar

| Endereço | Função |
|---|---|
| `http://localhost:4200` | Interface Angular |
| `http://localhost:5050` | API .NET |
| `http://localhost:5050/swagger` | Testes da API |

O Angular roda na porta `4200` e envia as requisições para a API na porta `5050`.

Exemplo:

```text
Angular em localhost:4200
        ↓
API em localhost:5050
        ↓
Banco SQLite
        ↓
Resposta volta para o Angular
```

## Banco de dados

A API usa SQLite.

O arquivo local é:

```text
MinhaPrimeiraApi/minhaapi.db
```

Esse arquivo não é enviado ao GitHub.

Ao clonar o projeto em outro computador, a estrutura do banco pode ser criada novamente com:

```powershell
cd MinhaPrimeiraApi
dotnet ef database update
```

As migrations necessárias já estão no repositório.

Para consultar os dados diretamente no DBeaver:

```sql
SELECT * FROM Products;
```

## Encerrar a aplicação

Para parar o back-end ou o front-end, use:

```text
Ctrl + C
```

no terminal correspondente.
