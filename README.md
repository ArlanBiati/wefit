# Teste Nest - WeFit

Projeto de teste técnico para e empresa WeFit.
Esse projeto foi criado usando Nest e com intuito de aplicar as melhores práticas.

## Instalação e Execução

Para **instalar** o projeto basta seguir o comando abaixo:

```bash
  npm i -g pnpm
  pnpm i
```

Para **iniciar** o projeto basta seguir o comando abaixo:

- 1 - Antes de qualquer coisa, é necessario criar uma pasta **data** na raiz do projeto. Ela sera responsavel por guardar os arquivos do nosso mysql que sera iniciado no docker.

- 2 - Iniciando o nosso container

  ```bash
  docker compose up -d

  ## Caso precise, verifique a documentação para realizar a instalação do docker ##
  ```

- 3 - Rodando migrations do prisma para criar as tabelas

  ```bash
  npx prisma migration deploy
  ```

- 4 - Iniciando o projeto

  ```bash
  pnpm start:debug

  ## Gosto de iniciar no modo debug por conta que o comando ja possue o watch que fica observando qualquer alteração ##
  ```

## Usando o swagger

Para documentar e facilitar os testes da aplicação, eu implementei um swagger.

Para acessa-lo e realizar os testes, só é necessário acessar:

```
    http://localhost:3000/api-docs
```

Divirta-se!

## Autores

- [@Arlan Biati](https://linkedin.com/in/arlanbiati)
