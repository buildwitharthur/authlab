# Padrões de componentes de funcionalidade

## Responsabilidade e composição

Componentes de funcionalidade representam blocos do produto. Diferencie
coordenação de comportamento e apresentação:

- Componentes que coordenam uma funcionalidade podem consultar dados ou executar
  mutações com hooks gerados, tratando seu ciclo de vida e efeitos.
- Componentes de apresentação recebem dados e ações por props e não iniciam
  requisições.
- Primitivas de UI expressam interação e aparência reutilizável sem regras de negócio.

Use funções com exports nomeados e props tipadas. Reutilize tipos gerados quando
o componente apresentar diretamente dados do contrato; crie um tipo de
apresentação apenas quando houver transformação concreta.

Mantenha estado visual no ancestral comum que coordena a interação. Quando apenas
um item puder estar aberto, controle sua identidade no conjunto e passe
`open` e `onOpenChange` aos itens.

## Formulários

Use React Hook Form com `zodResolver`, valores iniciais explícitos e tipos
compatíveis com o schema. Prefira schemas e tipos gerados quando o formulário
representar a entrada da API; mantenha extensões de interface fora da geração.

O contrato de envio é `onSubmit(values): void | Promise<void>`. Aguarde o
callback para que `isSubmitting` acompanhe toda a operação. O chamador controla
mutações, cache, notificações e navegação; o formulário cuida da entrada e
dos erros de campo.

Use `handleSubmit`, `noValidate` e mensagens junto aos controles.
Encaminhe `register` às primitivas de campo. Durante o envio, desabilite
controles, ajuste o texto da ação e exponha `aria-busy`.

Defina o tratamento das falhas assíncronas no responsável pela ação. Se ele já
notificou uma falha, não repita a mesma notificação no formulário. Não suponha
que o formulário tenha um fallback HTTP automático.

## Dados remotos e ações

Use os hooks e as chaves gerados para consultas, mutações e manutenção do cache.
Ações que mudam sessão precisam refletir a nova identidade nos dados remotos.
Não duplique clientes HTTP nem armazene respostas como estado visual.

Trate carregamento, erro, ausência de resultado e resposta vazia separadamente.
Use skeletons enquanto a consulta estiver pendente e dê feedback adequado após
falhas. Bloqueie repetição de ações durante uma mutação em andamento.

## Apresentação e acessibilidade

Reutilize tipografia, campos e botões compartilhados. Use HTML semântico,
relações entre títulos e seções, labels acessíveis e foco visível.
Interações devem funcionar por mouse, toque e teclado, sem depender apenas de hover.

Apresente datas em `pt-BR`, com `time`, valor de máquina válido e a convenção
UTC do produto. Use identidade estável como chave de listas. Iniciais e
formatação são apresentação; identidade, numeração e datas de negócio vêm da API.

Skeletons acompanham a geometria do conteúdo. Blocos decorativos usam
`aria-hidden`; o contêiner responsável anuncia o carregamento.
Preserve a composição mobile first, largura compartilhada e pontos de quebra
do contexto antes de introduzir novos ajustes responsivos.
