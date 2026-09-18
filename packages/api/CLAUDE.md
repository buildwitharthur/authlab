# API: autoridade do servidor e contrato HTTP

## Responsabilidade e fronteiras

Este pacote executa o servidor Fastify. Ele valida requisições, define respostas públicas e coordena
as operações de negócio. Não deve importar componentes, formulários ou tipos internos do web.

Use `@authlab/env` para configuração e `@authlab/database` para persistência. O envio de e-mails deve
passar por `@authlab/email` quando integrado, com uma dependência de workspace explícita. As bibliotecas
de infraestrutura não devem conhecer requisições Fastify nem decidir status HTTP.

As rotas atuais são pequenas e concentram o handler da operação. Extraia serviços quando houver
regras reutilizadas ou coordenação complexa; não crie camadas sem responsabilidade concreta. Mantenha
o contrato HTTP na rota mesmo quando a lógica for extraída.

## Composição do servidor

- Há uma instância Fastify com logging e type provider Zod.
- Os compiladores Zod validam entradas e serializam respostas. Preserve ambos ao adicionar operações.
- A infraestrutura é configurada antes das rotas de negócio. Swagger precisa observar o registro
  dessas rotas para compor o contrato publicado.
- Cada conjunto de endpoints é registrado como plugin assíncrono tipado. Definir um plugin de rota
  não o torna disponível sem registrá-lo na composição do servidor.
- Use os plugins para capacidades transversais e os handlers para operações específicas.

## Erros como parte do contrato

Erros esperados de negócio usam subclasses de `AppError`, com `code`, `statusCode` e uma mensagem
pública. O handler central transforma esses erros no corpo `{ error, message, statusCode }`.

Falhas de validação Zod retornam 400 com código `VALIDATION_ERROR`. Falhas inesperadas são registradas
no logger da requisição e retornam 500 com uma mensagem genérica. Não envie stack traces ou detalhes
do banco ao cliente. Não repita blocos `try/catch` em cada rota para reproduzir esse tratamento.

Quando uma falha de infraestrutura representar uma condição de negócio conhecida, converta-a em um
erro de aplicação no servidor. Documente os status esperados no schema da rota para que o consumidor
gerado tenha conhecimento deles; o handler global não acrescenta esses schemas ao OpenAPI sozinho.

## Contrato consumido pelo web

O OpenAPI é publicado em `/openapi.json` e a referência interativa em `/docs`. A verificação simples
de disponibilidade responde em `/health`; ela não verifica conectividade com banco ou provedor de e-mail.

Trate `operationId`, campos e status como parte da interface entre pacotes. Após alterar uma operação,
atualize a geração Kubb no web e revise os consumidores afetados. Não importe schemas de formulário
do navegador para definir a validação do servidor.

Associe exemplos realistas aos schemas Zod públicos com `.meta({ example: ... })`. Esses exemplos
devem representar uma requisição ou resposta válida e aparecer na documentação OpenAPI para facilitar
o entendimento e o teste manual da operação. Mantenha-os atualizados quando o contrato mudar.

## Autenticação e implementação atual

JWT, cookies, CORS e limitação de requisições estão configurados como infraestrutura. O registro
desses plugins não autentica rotas automaticamente. Ao criar uma operação protegida, implemente
verificação de sessão/token e autorização no servidor antes de acessar dados privados.

O cadastro atual é uma demonstração de contrato: aceita `name` e o devolve com status 200. Ainda não
há criação de usuário, senha persistida, emissão de sessão ou envio de e-mail nessa operação.

## Convenções de desenvolvimento

Use TypeScript estrito, módulos ESM e imports locais compatíveis com o runtime Node. O padrão atual
usa `@/` para o escopo local e extensão `.js` nos imports de módulos do servidor. A resolução no
TypeScript não garante, por si só, resolução de aliases no JavaScript executado.

Valide mudanças com `pnpm --filter @authlab/api check-types` e com requisições que cubram entrada
válida, entrada inválida e erros esperados da operação. Mudanças de contrato exigem conferir também
a especificação publicada e o consumidor gerado.
