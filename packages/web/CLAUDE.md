# Padrões do web

## Responsabilidade e composição

O web usa React, Vite, TanStack Router, TanStack Query e Tailwind CSS.
Acesse o servidor por HTTP, sem importar implementação da API ou pacotes de
infraestrutura de servidor.

Rotas e layouts compõem páginas, navegação e metadados. Componentes de
funcionalidade podem coordenar consultas e ações de um bloco do produto.
Componentes de apresentação recebem dados e callbacks por props. Primitivas de
UI encapsulam aparência, semântica e interação reutilizável.

Use componentes funcionais, props tipadas e preferencialmente exports nomeados.
Preserve a convenção local entre imports relativos e aliases `#/` ou `@/`.
Use textos de interface em português e os tokens visuais compartilhados.

## Inicialização e integrações

Configure o cliente HTTP compartilhado antes de renderizar seus consumidores.
Mantenha um `QueryClient` estável e um toaster global na composição de providers
acima do router. Não recrie clientes a cada renderização nem por página.

Centralize políticas de cache, tentativas e transporte. Sobrescreva-as por
consulta apenas quando a funcionalidade exigir. Opções de navegação devem ser
aplicadas à instância efetivamente montada.

## Consumo do contrato HTTP

O Kubb transforma o OpenAPI da API em tipos, clientes Axios, hooks React Query
e schemas Zod. Ao mudar o contrato:

1. Atualize os schemas e o `operationId` da operação no servidor.
2. Disponibilize a API com a especificação atualizada.
3. Execute `pnpm --filter @authlab/web exec kubb generate`.
4. Revise artefatos gerados e consumidores manuais.

A geração recria sua saída. Mantenha configuração manual do cliente, wrappers,
lógica de aplicação e documentação fora dela. Não corrija contratos editando
tipos ou schemas gerados.

Centralize URL base e `withCredentials` no cliente compartilhado. Coordene
credenciais com cookies e CORS da API, sem repetir URLs ou criar outra instância
Axios por componente.

Use hooks gerados em componentes ou hooks de aplicação; use clientes gerados em
fluxos imperativos. O resultado dos clientes oferece `.unwrap()` para obter o
corpo de sucesso e propagar falhas. Respeite o formato de erro do cliente sem
presumir que toda falha terá uma resposta HTTP.

## Estado, formulários e consultas

Use React Query como fonte do estado remoto. Reutilize chaves geradas e atualize,
invalide ou remova as consultas afetadas após mutações, especialmente em mudanças
de sessão. Evite cópias desnecessárias de respostas em estado local.

Formulários usam React Hook Form com `zodResolver`. Reutilize tipos e schemas
gerados quando os valores corresponderem ao contrato HTTP. Validações ou formatos
exclusivos da interface podem ser locais, com conversão explícita para o transporte.

O formulário recebe `onSubmit` e aguarda sua Promise. O responsável pela mutação
coordena notificações, cache e navegação. Defina um único responsável por
apresentar cada falha, incluindo fallback para erros sem resposta.

Dados de negócio vêm da API. Trate carregamento, sucesso, resposta vazia e erro
como estados distintos; não substitua falhas por dados fictícios nem mantenha
skeletons indefinidamente após uma falha.

## Sessão e navegação

A sessão é mantida pelo servidor em cookie HTTP-only e consultada pelo perfil.
Não mantenha tokens em armazenamento acessível ao JavaScript nem use um booleano
local como autoridade de autenticação.

Proteja a área autenticada no limite do ramo e redirecione usuários com sessão
válida para fora dos formulários de acesso. Aguarde a consulta antes de decidir
a navegação. Diferencie sessão inválida de indisponibilidade da API no tratamento
de erros; o guard do navegador não substitui proteção do servidor.

Após entrar ou sair, mantenha o cache de sessão e de dados privados coerente
com a nova identidade. Use as operações geradas para autenticação e encerramento;
navegar para outra página não encerra a sessão.

## Verificação

Use `pnpm --filter @authlab/web build` e
`pnpm --filter @authlab/web exec tsc --noEmit` para mudanças de implementação.
Confira navegação, sessão, estados de consulta e envio, acessibilidade e
responsividade conforme a funcionalidade alterada. O build Vite não substitui
a análise de tipos.
