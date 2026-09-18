# Web: composição da interface e consumo da API

## Responsabilidade e organização por camada

Este pacote é uma aplicação React com Vite, TanStack Router, TanStack Query e Tailwind CSS. Executa
no navegador e acessa o servidor por HTTP. Não importe os pacotes de banco, e-mail ou ambiente de
servidor, nem compartilhe contratos por imports internos da API.

| Camada                        | Responsabilidade                                                   |
| ----------------------------- | ------------------------------------------------------------------ |
| Rotas e layouts               | Definir navegação, metadados e composição das páginas              |
| Componentes de funcionalidade | Apresentar dados e interações específicas do produto por props     |
| Primitivas de UI              | Encapsular aparência, semântica e interação visual reutilizável    |
| Schemas de formulário         | Validar valores da interface e mensagens para o usuário            |
| Integrações                   | Compor providers e configuração global de serviços do frontend     |
| Utilitários de aplicação      | Compartilhar políticas como configuração HTTP e metadados          |
| Consumo gerado da API         | Representar o contrato OpenAPI em tipos, clientes, hooks e schemas |
| Tipos de apresentação e mocks | Representar necessidades visuais e dados temporários do protótipo  |

## Inicialização e providers

A configuração do cliente HTTP é importada antes da renderização. Ela ajusta a instância compartilhada
gerada pelo Kubb; preservar essa ordem garante que os consumidores usem a configuração da aplicação.

As integrações envolvem o router com um `QueryClientProvider` e montam um único toaster global.
O `QueryClient` é criado de forma estável com inicialização de estado e usa `staleTime` de cinco
minutos para queries. Não recrie o cliente a cada renderização nem acrescente um provider por página.
Políticas diferentes devem ser explícitas na query que precisa delas.

O router ativo usa preload por intenção e restauração de rolagem. Novos providers compartilhados
devem entrar na composição de integrações; estado usado por uma única funcionalidade deve permanecer
local. Modifique a instância efetivamente montada ao alterar opções de navegação.

## Comunicação HTTP e geração de código

A fonte de verdade do transporte está nos schemas das rotas Fastify. O Kubb lê o OpenAPI da API em
`http://localhost:8080/openapi.json` e produz tipos TypeScript, clientes Axios, hooks React Query,
schemas Zod e o runtime compartilhado de requisições.

Para atualizar esse consumo:

1. Implemente ou altere a operação na API, incluindo um `operationId` estável e respostas tipadas.
2. Inicie a API com `pnpm --filter @authlab/api dev` e confira que ela publica o contrato atualizado.
3. Execute `pnpm --filter @authlab/web exec kubb generate`.
4. Revise as mudanças geradas e ajuste os consumidores manuais.

A geração limpa `src/api` antes de recriar a saída. Não edite seus artefatos nem coloque wrappers,
lógica de negócio ou documentação nesse diretório. Mudanças no transporte pertencem à configuração
manual do cliente, fora da saída gerada; mudanças nos tipos pertencem ao contrato da API.

O cliente compartilhado usa atualmente `http://localhost:8080` como base e `withCredentials: true`.
Não crie outra instância Axios por componente nem repita URLs nos consumidores. Credenciais no HTTP
precisam ser compatíveis com cookies e CORS no servidor; não comprovam que há uma sessão implementada.

Use hooks gerados em componentes ou hooks de aplicação que precisam de estado de consulta/mutação.
Use clientes gerados em código imperativo, onde hooks React não podem ser chamados. Os clientes
retornam um resultado de requisição; `.unwrap()` entrega o corpo de sucesso. As mutações geradas
usam esse mecanismo para propagar falhas ao React Query.

## Estado e integração dos formulários

Mantenha valores e validação dos formulários no React Hook Form. A página ou um hook de aplicação
coordena a chamada HTTP e entrega ao formulário um callback que retorna a Promise da operação.
Isso permite que `isSubmitting` acompanhe o envio real.

Use o cache React Query para estado remoto. Ao integrar uma mutação que altera dados já consultados,
atualize ou invalide as queries afetadas usando suas chaves, sem duplicar a resposta em estados locais
desnecessários. Estado puramente visual pode usar estado React local.

Schemas gerados representam o contrato HTTP; schemas de formulário representam a experiência de
entrada. Faça conversões explícitas quando os formatos divergirem. No cadastro atual, os valores
`name`, `email`, `password` e `showOnWall` já correspondem ao corpo gerado e são enviados pela página
com `useCreateAccount`; conflito de e-mail é tratado como erro específico antes do fallback genérico.

## Dados mockados e migração para a API

Os dados de negócio estão mockados temporariamente para permitir o desenvolvimento da interface.
Posteriormente, o membro atual, a lista de membros do mural e as contagens deverão vir da API,
incluindo a contagem hoje fixa no layout de autenticação. A API será a fonte de verdade; os mocks
não constituem uma solução permanente de dados para o web.

Enquanto os endpoints não estiverem disponíveis, mantenha os dados simulados isolados e forneça-os
aos componentes por props. Evite espalhar novos valores de negócio fixos em páginas e componentes.

Ao disponibilizar cada operação na API:

1. Defina o contrato real no servidor e regenere os clientes, hooks e tipos com Kubb.
2. Substitua a origem mockada na página, layout ou hook de aplicação responsável pela consulta.
3. Use React Query para acompanhar carregamento, erro, cache e atualização dos dados remotos.
4. Converta a resposta para as props de apresentação, preservando os componentes visuais.
5. Trate também respostas vazias e remova o uso do mock naquele fluxo. Uma falha de requisição deve
   aparecer como erro, sem substituir silenciosamente a resposta por dados fictícios.

Os componentes do mural recebem um tipo de apresentação de membro. O número do membro e os dados
simulados não definem o modelo do banco nem obrigam a API a reproduzir a estrutura do mock. Formatação
de datas e iniciais pode permanecer no web; identidade, datas de entrada, numeração e contagens de
negócio devem ser obtidas ou definidas pelo contrato da API, sem inventar valores no frontend.

## Convenções de apresentação e estilo

Use componentes funcionais, props tipadas e exports nomeados. O web aceita os aliases `#/` e `@/`
para fontes locais; preserve a convenção do contexto editado. A configuração é própria do bundler,
sem exigir as mesmas extensões de import dos pacotes de servidor.

Preserve os tokens visuais, as primitivas compartilhadas e os textos de interface em português.
As instruções locais de rotas, componentes, UI e schemas detalham esses padrões.

## Verificação

Use `pnpm --filter @authlab/web build` para compilar a aplicação e
`pnpm --filter @authlab/web exec tsc --noEmit` para analisar tipos. Verifique também navegação,
metadados, estados de formulário e responsividade conforme a mudança. O pacote ainda não declara
tarefas próprias de testes ou lint.
