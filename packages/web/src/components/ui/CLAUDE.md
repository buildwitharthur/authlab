# Primitivas de interface

## Quando criar ou estender uma primitiva

Use esta camada para controles e elementos visuais reutilizáveis sem conhecimento de membros,
autenticação, API ou navegação de negócio. Antes de criar outro controle, avalie se uma variante ou
composição de uma primitiva existente atende à necessidade.

As primitivas simples usam HTML nativo. Interações compostas, como tooltip e abas, encapsulam Base
UI para preservar sua semântica e comportamento. Não substitua essa interação por implementações
manuais apenas para ajustar aparência.

## API de componentes e classes

- Derive props com `ComponentProps` do elemento nativo ou da primitiva encapsulada.
- Encaminhe as props pertinentes, incluindo acessibilidade, eventos e refs necessários aos campos.
- Exponha `className` para ajustes de composição e combine-o com a base usando `twMerge`.
- Use `tv` e `VariantProps` para opções visuais recorrentes, com variantes e defaults explícitos.
- Identifique partes com `data-slot` e estados visuais com atributos consistentes, como
  `data-disabled`; preserve também a propriedade funcional nativa `disabled`.
- Botões usam `type="button"` como padrão. O consumidor declara `type="submit"` quando necessário.

Não adicione uma variante para cada tela. Uma primitiva deve expressar diferenças reutilizáveis;
posicionamento e espaçamento de uma composição específica podem ser definidos pelo consumidor.

## Sistema visual

Use Tailwind com os tokens CSS compartilhados. Prefira cores semânticas, como `primary`, `surface`,
`foreground`, `border` e `destructive`, em vez de repetir valores de cor nos componentes.
Tipografia, raios, espaçamentos, sombras, duração de movimento e área de toque também têm tokens.

Preserve o tema escuro, o destaque verde e a distinção entre fonte de títulos e de corpo. Mudanças
globais pertencem aos tokens; mudanças reutilizáveis de uma primitiva pertencem às suas variantes.
Não crie um segundo tema por página para resolver uma diferença local.

## Acessibilidade como parte do contrato

Campos associam label e controle por identificador estável, usando `useId` quando necessário.
Mensagens são ligadas por `aria-describedby`; erros também usam `aria-invalid` e anúncio apropriado.
Preserve descrições de acessibilidade fornecidas pelo consumidor ao compor esses atributos.

Mantenha foco visível, área mínima de toque de 44 pixels e suporte a movimento reduzido. Skeletons
decorativos usam `aria-hidden`; o contêiner da funcionalidade anuncia o carregamento. Portais e
estados controlados de componentes Base UI devem continuar operando ao personalizar estilos.

O toaster visual é compartilhado e montado uma vez nas integrações. As funcionalidades disparam
notificações pelo Sonner sem criar novas instâncias visuais em cada página.
