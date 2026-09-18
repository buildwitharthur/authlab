# Padrões de endpoints

## Registro e schemas

Exporte um plugin assíncrono tipado como `FastifyPluginAsyncZod` e registre-o
na composição da API. Use nomes em inglês e camelCase, coerentes com a operação
pública, e preserve o `operationId` usado pela geração do consumidor.

Declare schemas como constantes nomeadas junto ao contrato da operação.
Use nomes que expressem operação e finalidade, como corpo, resposta ou erro.
Reutilize um schema quando formato e significado forem os mesmos.

Cada operação declara:

- `tags`, descrição do comportamento e `operationId` único;
- schemas de `body`, `params` e `querystring` para as entradas aceitas;
- schemas de `response` por status de sucesso e falhas públicas esperadas;
- `security: [{ cookieAuth: [] }]` quando exigir sessão;
- exemplos `.meta({ example: ... })` nos corpos estruturados públicos.

Exemplos devem ser fictícios, completos e compatíveis com o JSON transportado,
incluindo datas serializadas e códigos de erro. Não inclua segredos ou dados
pessoais reais. Preserve o formato de sucesso de cada operação; não acrescente
um envelope genérico sem necessidade do contrato.

Quando o corpo contratado for `null`, use `z.null()` e envie `null` com o
status declarado. Não trate JSON `null` e ausência de corpo como equivalentes.

## Autenticação e handler

Operações protegidas chamam `request.verifyAuth()` em `preHandler` antes
do handler e documentam 401. A declaração de segurança no schema apenas descreve
o contrato; ela não valida a sessão.

1. Leia entradas validadas e a identidade autenticada, quando aplicável.
2. Aplique autorização e filtros de visibilidade da operação.
3. Coordene persistência e efeitos externos pelas interfaces públicas dos pacotes.
4. Lance erros de aplicação para falhas de negócio esperadas.
5. Envie o status e os campos públicos definidos no schema.

Não use coerções de tipo para contornar validação. Não devolva automaticamente
o modelo completo do banco nem exponha hashes. Consultas de listagem devem
explicitar filtros, projeção pública e ordenação quando fizerem parte do contrato.
Contagens precisam refletir seu universo de dados, sem confundir total de contas
com quantidade de membros visíveis.

## Erros e evolução

Os erros centralizados seguem `{ error, message, statusCode }`. Mantenha código,
mensagem, status e exemplos coerentes. Use tratamento local apenas para traduzir
uma falha conhecida ou decidir o efeito de uma integração; deixe o fallback
inesperado para o handler central.

Mudanças em `operationId`, campos, status ou segurança afetam consumidores mesmo
quando a URL é preservada. Atualize o OpenAPI e regenere o consumo Kubb após mudar
o contrato. Confira a representação serializada das respostas, especialmente
datas, além dos tipos usados dentro do handler.
