# Padrão de criação de endpoints

## Unidade de implementação

Exporte uma função assíncrona tipada como `FastifyPluginAsyncZod` para registrar a operação e inclua-a
na composição da API com `app.register`. Use nomes de operação em inglês e camelCase, coerentes com
o `operationId` público.

Declare os schemas públicos como constantes nomeadas no módulo, antes do plugin, e referencie-os no
registro do método HTTP. Use o nome da operação como prefixo, por exemplo
`createAccountBodySchema` e `createAccountResponseSchema`; um schema de erro pode ter nome comum
quando o mesmo formato é usado por mais de um status. Isso mantém o contrato legível sem afastá-lo
do handler que o implementa.

No schema da operação, defina:

- `tags` para agrupar o domínio da operação na documentação;
- uma descrição que explique comportamento e condições relevantes;
- `operationId` único e estável, pois ele orienta os símbolos gerados no web;
- schemas Zod de `body`, `params` e `querystring` quando a operação aceitar esses dados;
- schemas de `response` por status, incluindo sucesso e falhas públicas esperadas;
- `.meta({ example: ... })` nos schemas públicos com corpo estruturado, com exemplos completos e
  realistas que possam ser exibidos na documentação OpenAPI.

O valor de `example` deve respeitar exatamente o schema ao qual está associado. Use dados fictícios,
mas plausíveis, sem segredos ou dados pessoais reais. Para um corpo `{ name: string }`, por exemplo,
use `.meta({ example: { name: 'Arthur Reis' } })` em vez de um objeto vazio. Documente também um
exemplo representativo para cada resposta pública cujo formato seja diferente.

Respostas deliberadamente sem conteúdo podem usar `z.null()` e devem enviar `null`; não invente um
objeto apenas para fornecer exemplo. Mantenha descrição, schemas e status coerentes com o
comportamento real da operação.

## Padrão do handler

1. Leia as entradas tipadas a partir da requisição validada pelo Fastify.
2. Verifique autenticação e autorização quando a operação exigir acesso protegido.
3. Execute a operação de negócio usando as interfaces públicas dos pacotes de infraestrutura.
4. Lance um erro de aplicação para condições de negócio esperadas.
5. Envie o status e um corpo que correspondam ao schema de resposta.

Não use coerções de tipo para contornar entradas não validadas. Não devolva automaticamente o modelo
completo do banco: selecione os campos públicos definidos no contrato. A rota decide o status HTTP;
o banco e o provedor de e-mail não devem assumir essa responsabilidade.

O projeto não impõe atualmente um envelope único para respostas de sucesso. Preserve o contrato de
cada operação; por exemplo, o cadastro responde `201` com `null`. Os erros tratados centralmente
seguem `{ error, message, statusCode }` e as falhas de negócio esperadas devem referenciar esse
formato no mapa de respostas.

## Evolução do contrato

Mudar o `operationId` pode renomear clientes, hooks e tipos do web mesmo que a URL não mude. Mudar
campos ou status exige ajustar schemas e consumidores juntos. Após registrar ou alterar uma rota,
publique o OpenAPI atualizado e execute a geração Kubb no pacote web.

A rota de cadastro exemplifica o padrão atual: schemas nomeados de entrada, sucesso e erro ficam no
mesmo módulo; o contrato aceita `name`, `email`, `password` e `showOnWall`; e o handler converte esses
dados para o modelo persistido sem expor `passwordHash`. O cliente do web deve continuar sendo
regenerado a partir do OpenAPI sempre que esse contrato mudar.
