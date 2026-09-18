# Padrões da API

## Responsabilidade e fronteiras

A API Fastify é a autoridade para contratos HTTP, autenticação, autorização e
coordenação das operações de negócio. Use `@authlab/env` para configuração,
`@authlab/database` para persistência e `@authlab/email` para envio de mensagens.

Mantenha status HTTP e decisões de negócio na API. Bibliotecas de infraestrutura
não devem depender de requisições Fastify ou da interface web. Extraia serviços
quando houver regras reutilizadas ou coordenação complexa, mantendo o contrato
HTTP junto ao registro da operação.

## Composição do servidor

Configure logging, type provider Zod e os compiladores de validação e serialização
na instância compartilhada. Registre a infraestrutura antes das operações que
dependem dela. Swagger precisa observar o registro das rotas para gerar o contrato.

Use plugins para capacidades transversais e handlers para operações específicas.
Respeite dependências e encapsulamento do Fastify ao disponibilizar hooks e
decorators. Uma operação só fica disponível quando registrada na composição.

## Contratos públicos

Defina schemas Zod nomeados para entradas, sucesso e erros esperados.
Mantenha `operationId` único e estável, descrições claras e exemplos
`.meta({ example: ... })` compatíveis com o JSON público.

Selecione os campos de resposta explicitamente. Modelos persistidos, dados de
credenciais e payloads de transporte têm responsabilidades diferentes.
Respostas cujo valor contratado é `null` usam `z.null()` e enviam `null`;
isso é diferente de uma resposta HTTP sem corpo.

O OpenAPI é a fonte do consumo gerado no web. Mudanças de entrada, saída, status
ou autenticação exigem conferir a especificação publicada, regenerar o Kubb e
revisar os consumidores.

## Autenticação e dados privados

Use Argon2 para gerar e verificar hashes de senha. Normalize identificadores
conforme o schema de entrada; não transforme silenciosamente senhas.
Falhas de credenciais devem produzir uma mensagem única, sem distinguir conta
inexistente de senha incorreta.

A sessão usa JWT em cookie HTTP-only. Operações protegidas executam
`request.verifyAuth()` em `preHandler` e declaram `cookieAuth` no OpenAPI.
Use a identidade verificada pela requisição para acessar dados do usuário;
não aceite um identificador fornecido pelo cliente como prova de identidade.

O guard de autenticação verifica token e existência do usuário. Regras adicionais
de autorização e visibilidade pertencem à operação, antes do acesso ou exposição
de dados. Registro de plugins e declaração OpenAPI não executam essa proteção.

Mantenha criação de conta, início de sessão e encerramento de sessão como ações
distintas. Encerrar a sessão remove o cookie do navegador; não equivale a revogar
um JWT já emitido. Não prometa revogação sem um mecanismo que a implemente.

## Erros e efeitos externos

Erros esperados usam subclasses de `AppError`, com código, status e mensagem
pública. O handler central produz `{ error, message, statusCode }`, converte
falhas de validação em 400 e registra falhas inesperadas antes de responder 500
com mensagem genérica. Não reproduza esse tratamento em cada handler.

Converta falhas conhecidas de infraestrutura em erros de aplicação quando
representarem uma condição de negócio. Documente os erros esperados nos schemas;
o handler global não os acrescenta automaticamente ao OpenAPI.

Persistência e envio externo não são uma transação única. Defina como falhas do
provedor afetam a resposta, trate tanto resultados de erro quanto exceções e não
confunda uma chamada concluída com garantia de entrega.

## Desenvolvimento e verificação

Use imports ESM compatíveis com Node, extensão `.js` nos imports locais de
servidor e aliases restritos ao pacote. Resolução de tipos não garante resolução
no JavaScript executado.

Execute `pnpm --filter @authlab/api check-types` ao alterar implementação.
Verifique os contratos afetados com entradas válidas e inválidas, credenciais
ausentes ou inválidas e respostas públicas. Ao mudar sessão, confira também
emissão, envio e remoção do cookie no navegador.
