# Padrões de rotas e layouts

## Definição e geração

Use TanStack Router com `createFileRoute` nas rotas de aplicação e
`createRootRoute` na raiz. Exporte `Route` e deixe a árvore e seus tipos
sob responsabilidade do gerador.

Preserve as convenções de descoberta: prefixo `_` para segmentos sem URL
pública, `index` para a entrada de um ramo e `layout` como token de layout.
O identificador interno da rota e o destino público de navegação têm papéis
diferentes.

Mantenha os mesmos tokens e opções nos pontos de geração usados pelo projeto,
incluindo plugin Vite e CLI. Confira essa compatibilidade antes de alternar o
gerador; não ajuste a árvore gerada manualmente.

## Composição e ações

Uma página compõe a funcionalidade e coordena ações que afetam navegação,
notificações e cache. Reutilize formulários e componentes visuais em vez de
implementar controles genéricos na página.

Layouts mantêm estrutura e políticas compartilhadas de um ramo, renderizando
descendentes com `Outlet`. Evite repetir cabeçalhos, rodapés ou guards nas
páginas filhas. A raiz integra `HeadContent` e `Outlet`; providers globais
permanecem acima do router.

Consultas podem ser coordenadas pela página, layout, hook de aplicação ou
componente de funcionalidade que detenha a responsabilidade pelos dados.
Escolha o escopo que compartilha o resultado ou controla seu ciclo de vida,
preservando componentes de apresentação alimentados por props.

Mutações usam hooks gerados e retornam a Promise ao formulário. Trate efeitos
de sucesso e erro no responsável pela ação, inclusive em callbacks da mutação.
Forneça fallback para falhas sem corpo HTTP e evite notificações duplicadas ou
rejeições sem tratamento no limite da interação.

## Sessão e estados remotos

Aplique o guard no ramo autenticado. Consulte a sessão antes de renderizar
conteúdo privado ou redirecionar. No ramo de acesso, direcione usuários já
autenticados à área de membro.

A decisão de navegação usa o estado remoto da sessão. Mantenha seu cache coerente
após entrada e saída, distinguindo carregamento, ausência de sessão e erro de
consulta. A proteção visual não substitui autenticação e autorização da API.

Associe skeletons ao carregamento real, no escopo substituído pela consulta.
Trate falhas e respostas vazias explicitamente. Preserve estruturas já
disponíveis quando isso fizer sentido para o estado apresentado.

## Metadados e navegação

Defina `head` retornando `{ meta: [{ title: '...' }] }`, com um título próprio
por rota.

Use `Link` e destinos tipados para navegação interna. Quando a indicação ativa
exigir correspondência exata, use `activeOptions` com `exact` e preserve
`aria-current`. Mudanças de página continuam sendo links mesmo quando
apresentadas visualmente como abas; abas de UI alternam painéis na mesma página.
