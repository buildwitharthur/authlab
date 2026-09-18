# Infraestrutura transversal do servidor

## Quando criar um plugin

Use esta camada para configurar capacidades compartilhadas do Fastify: tratamento de erros,
políticas HTTP, autenticação, cookies, documentação e limites de uso. Regras específicas de cadastro,
membros ou envio de boas-vindas pertencem à operação de negócio.

O padrão atual exporta funções que recebem `FastifyInstance` e configuram a instância ou registram
uma integração com `app.register`. Essas funções são chamadas na composição do servidor antes das
rotas. Preserve a ordem das dependências; Swagger precisa ser registrado antes dos endpoints que
documenta. Considere o encapsulamento do Fastify ao mudar o escopo de hooks ou decorators.

## Políticas atuais

- O tratamento de erros é centralizado e distingue validação, erro de aplicação e falha inesperada.
- CORS aceita a origem recebida e permite credenciais. Ao mudar a política de origem, coordene-a com
  o endereço do web e o envio de credenciais pelo cliente HTTP.
- A limitação é global, com até 100 requisições por minuto, e usa o erro de aplicação de excesso de
  requisições. Exceções devem ser explícitas na configuração da operação.
- A integração de cookies recebe opções de `httpOnly`, `sameSite: 'lax'`, caminho raiz e `secure`
  condicionado à produção. Ao emitir cookies de sessão, confira as opções efetivas de escrita;
  configurar o parser não implementa a emissão nem a política completa da sessão.
- JWT usa o segredo validado por `@authlab/env`. Registrar o plugin não aplica verificação de token
  a todos os endpoints.
- Swagger transforma os schemas Zod em OpenAPI; Scalar apresenta esse contrato ao desenvolvedor.

## Evolução das integrações

Leia configuração por `@authlab/env`, sem espalhar acessos a `process.env`. Mantenha a tradução de
erros consistente com o handler central. Ao alterar cookies, CORS ou autenticação, verifique a
operação completa no navegador e no servidor: a configuração de apenas um lado não estabelece sessão.
