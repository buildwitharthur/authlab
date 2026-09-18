# Rotas, páginas e layouts

## Padrão de criação de rotas

O TanStack Router descobre a hierarquia a partir da organização das rotas. Exporte `Route` com
`createFileRoute` nas rotas de aplicação; a raiz usa `createRootRoute`. A árvore final e seus tipos
são gerados e não devem ser alterados manualmente.

- Segmentos prefixados por `_` organizam rotas sem acrescentar aquele segmento à URL pública.
- O token `index` representa a página de entrada do ramo.
- O token de rota configurado no plugin Vite é `layout`, usado para o contêiner de um ramo.
- O identificador usado por `createFileRoute` acompanha a hierarquia interna; navegação usa a URL
  pública tipada pelo router.

Por exemplo, o ramo de autenticação é sem segmento público: entrada está em `/` e cadastro em
`/create-account`. O ramo de aplicação tem o prefixo `/app`; seu agrupamento interno de boas-vindas
não acrescenta outro segmento à URL.

## Separação de página e layout

Uma página compõe a funcionalidade: títulos locais, componentes visuais e coordenação das ações.
Evite implementar controles de formulário ou primitivas genéricas dentro dela.

Quando uma ação usa uma mutação gerada, a página chama o hook, trata respostas conhecidas e decide
os efeitos de sucesso, como notificação e navegação. Reconheça erros HTTP específicos pelo tipo do
cliente e pelo status; depois de tratar um caso esperado, retorne. Relance falhas desconhecidas para
que o formulário ou o limite de erro responsável apresente o fallback, sem duplicar notificações.

Um layout mantém a estrutura compartilhada do ramo e renderiza os descendentes com `Outlet`.
Use-o para cabeçalho, rodapé, largura de conteúdo e navegação compartilhada; não repita essa estrutura
nas páginas. O layout de autenticação envolve os formulários, e o layout da aplicação mantém a
estrutura da área de membro.

A raiz renderiza `HeadContent` e `Outlet`. Providers globais ficam na composição de integrações,
acima do router. Não replique QueryClient ou toaster em layouts.

As páginas e layouts que hoje usam mocks deverão consumir a API quando os endpoints estiverem
disponíveis. Isso inclui o membro atual, o mural e a contagem de membros exibida na autenticação.
Faça a troca da origem dos dados nesse ponto de composição ou em um hook de aplicação, mantendo
os componentes visuais alimentados por props e tratando carregamento, erro e resposta vazia.

## Metadados e navegação

Defina `head` usando `createRouteMetadata`, com título e descrição específicos. Esse helper compõe
metadados básicos, robots, Open Graph e Twitter. Use `noIndex` para páginas que não devem ser
indexadas, como a área de membro; isso não controla acesso nem substitui autenticação.

Use `Link` do TanStack Router para navegação interna e destinos públicos tipados. Quando o estado
ativo precisar corresponder exatamente à página, use `activeOptions` com `exact` e preserve
`aria-current`. Links de troca entre páginas de entrada e cadastro são navegação, mesmo com aparência
de abas; primitivas de abas são para alternar painéis dentro da mesma página.

## Carregamento, proteção e geração

Ao integrar dados remotos, trate carregamento e erro no escopo da página ou rota. Os skeletons
existentes podem ocupar o espaço de `Outlet`, preservando cabeçalho e rodapé; sua existência não
significa que já estejam conectados a um loader ou estado pendente.

O layout `/app` ainda não verifica sessão. Quando houver autenticação, associe a verificação e os
redirecionamentos ao ramo apropriado, além da autorização obrigatória na API.

O fluxo Vite gera as rotas com a convenção `layout`. Há também um comando independente
`generate-routes`, mas sua configuração atual não declara esse token; alinhe as configurações antes
de depender dele. Não corrija diferenças de geração editando a árvore resultante à mão.
