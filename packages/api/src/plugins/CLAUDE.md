# Padrões de infraestrutura do servidor

## Responsabilidade e composição

Use plugins para capacidades transversais: erros, políticas HTTP, autenticação,
cookies, documentação e limites de uso. Regras específicas de uma operação
pertencem ao seu handler ou serviço de aplicação.

Integrações recebem a instância Fastify e configuram ou registram a capacidade.
Use `fastify-plugin` quando decorators precisarem ser compartilhados fora do
encapsulamento padrão. Declare seus tipos por module augmentation quando necessário.

Respeite a ordem das dependências: parsing de cookies e JWT antes do uso da
verificação de sessão, documentação antes das rotas que ela descreve. Disponibilize
a infraestrutura no escopo em que os consumidores serão registrados.

## Sessão e políticas HTTP

Centralize o nome do cookie e use a mesma referência na configuração JWT, emissão,
remoção e documentação OpenAPI. Preserve `httpOnly`, `sameSite`, caminho e
`secure` condicionado ao ambiente. Mantenha a duração do cookie coerente com a
expiração do token e a remoção compatível com o escopo usado na emissão.

O JWT usa o segredo validado por `@authlab/env`. A assinatura do token e a
assinatura opcional do cookie são mecanismos distintos; não presuma que configurar
um segredo de cookie ativa ambos.

O decorator `verifyAuth` valida o token, confirma a existência do usuário e
disponibiliza sua identidade na requisição. Converta token inválido ou usuário
ausente em `UnauthorizedError`. Falhas de infraestrutura continuam sendo erros
inesperados, em vez de serem mascaradas como credenciais inválidas.

Não aplique autenticação implicitamente a toda operação. Cada rota protegida
aciona o guard; regras de autorização de negócio permanecem na operação.

Coordene origens CORS e credenciais com o cliente HTTP do web. Preserve a
limitação global de requisições e faça exceções explicitamente, mantendo o
formato público de erro. Configuração de CORS não substitui autorização.

## Erros e documentação

Mantenha um handler central para validação, `AppError` e falhas inesperadas.
Use o logger da requisição para diagnóstico e respostas genéricas para erros
internos, sem expor tokens, senhas ou detalhes de infraestrutura.

Swagger transforma schemas Zod em OpenAPI e declara os mecanismos de segurança.
A referência interativa consome esse mesmo contrato. Não mantenha uma definição
manual paralela de entradas e respostas.

## Verificação

Leia configuração por `@authlab/env`. Ao alterar hooks, decorators ou registro,
confira disponibilidade e isolamento no escopo consumidor. Para mudanças em
autenticação, cookies ou CORS, verifique o fluxo completo entre navegador e API,
incluindo sessão ausente, inválida, expirada e encerrada.
