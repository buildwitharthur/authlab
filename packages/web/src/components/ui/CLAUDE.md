# Padrões de primitivas de interface

## Responsabilidade

Primitivas encapsulam controles e elementos visuais reutilizáveis, sem conhecer
autenticação, membros, API ou navegação de negócio. Antes de criar outro controle,
avalie composição ou variantes de uma primitiva existente.

Use HTML nativo para controles simples. Para interações compostas, como tooltip
e abas, preserve o comportamento e a semântica da Base UI ao personalizar estilos.

## Props e variantes

- Derive props com `ComponentProps` do elemento nativo ou da primitiva encapsulada.
- Encaminhe atributos, eventos e refs necessários à integração com formulários.
- Exponha `className` e combine estilos com `twMerge` quando houver composição
  de classes.
- Use `tv` e `VariantProps` para opções visuais recorrentes, com defaults claros.
- Identifique partes com `data-slot` e estados com atributos consistentes,
  preservando também propriedades funcionais como `disabled`.
- Use `type="button"` por padrão; o consumidor declara `type="submit"`.

Variantes expressam diferenças reutilizáveis. Posicionamento e espaçamento de
uma composição específica pertencem ao consumidor. Mantenha estado controlado
e callbacks compatíveis com a primitiva encapsulada.

## Sistema visual

Use Tailwind e tokens CSS compartilhados para cores semânticas, tipografia,
raios, espaçamento, sombras e movimento. Preserve o tema escuro, o destaque
verde e a distinção entre fontes de títulos e corpo.

Mudanças globais pertencem aos tokens; diferenças reutilizáveis de um controle
pertencem às variantes. Evite valores visuais duplicados e temas locais que
divirjam das convenções do produto.

## Acessibilidade

Associe label e controle por identificador estável, usando `useId` quando
necessário. Conecte mensagens com `aria-describedby`, preserve descrições do
consumidor e marque erros com `aria-invalid` e anúncio apropriado.

Preserve foco visível, interação por teclado, suporte a movimento reduzido e
o token de área mínima de toque nas composições interativas. Não use apenas
cor ou hover para transmitir estado ou disponibilizar uma ação.

Skeletons decorativos ficam ocultos de leitores de tela; a funcionalidade
anuncia seu carregamento. Preserve portais, foco e eventos da Base UI ao
personalizar componentes compostos.

O toaster é montado uma vez na composição global. Funcionalidades disparam
notificações pelo Sonner, sem criar instâncias visuais por página.

## Verificação

Ao alterar uma primitiva, confira consumidores e variantes afetados, incluindo
estados desabilitado, erro e foco quando aplicáveis. Verifique teclado,
responsividade e propagação de props, evitando regressões em formulários e
componentes que dependem dela.
