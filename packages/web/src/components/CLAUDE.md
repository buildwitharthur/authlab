# Componentes de funcionalidade

## Responsabilidade e composição

Use esta camada para blocos reconhecíveis do produto, como formulários, apresentação do membro,
mural, cabeçalho e rodapé. Componentes puramente visuais e reutilizáveis entre funcionalidades
pertencem às primitivas de UI; decisões de navegação e coordenação da página pertencem às rotas.

Prefira funções com exports nomeados e props tipadas. Receba dados por props e ações por callbacks.
Componentes de apresentação não devem importar mocks nem abrir suas próprias conexões HTTP. Ao
precisar de dados remotos, coordene a operação na página ou em um hook de aplicação e passe o resultado.

Mantenha o estado visual no ancestral comum que coordena a interação. O mural, por exemplo, controla
qual membro está aberto e passa `open` e `onOpenChange` aos itens. Evite estados independentes que
permitam combinações incompatíveis com a interação esperada.

## Padrão de formulário

- Use React Hook Form com `zodResolver`, valores iniciais explícitos e tipos inferidos do schema.
- O contrato de envio é `onSubmit(values): void | Promise<void>`; aguarde o callback para que o estado
  de envio dure até o fim da operação assíncrona.
- Use `handleSubmit`, `noValidate` e mensagens do schema para manter a validação consistente.
- Encaminhe `register` às primitivas de campo e exiba os erros junto aos controles.
- Durante envio, desabilite controles, ajuste o texto do botão e exponha `aria-busy` no formulário.
- Os formulários atuais capturam falhas do callback e exibem uma notificação genérica. Ao tratar
  erros específicos no chamador, evite notificar a mesma falha duas vezes.

Não transforme um formulário em cliente HTTP acoplado a um endpoint. A página decide o que acontece
após sucesso, incluindo atualização de cache ou navegação. Os callbacks atuais de autenticação
apenas informam que a funcionalidade ainda não está disponível.

## Apresentação e acessibilidade

Reutilize os componentes de tipografia, campos e botões. Use HTML semântico, relações entre títulos
e seções, labels acessíveis e foco visível. Interações do mural precisam funcionar por mouse, toque
e teclado, sem depender exclusivamente de hover.

Apresente datas de membro em `pt-BR`, mantendo o elemento `time` com valor de máquina e a convenção
UTC usada atualmente. Chaves de listas devem representar a identidade do dado.

## Carregamento e responsividade

Crie skeletons com geometria próxima ao conteúdo final e composição equivalente por seção. O
contêiner de carregamento anuncia o estado; os blocos decorativos permanecem ocultos de leitores
de tela. Conecte esses componentes ao carregamento real quando houver integração de dados.

Preserve a abordagem mobile first, a largura máxima compartilhada e os ajustes responsivos do
contexto. Os layouts atuais usam ampliações a partir de 721 e 1081 pixels; não invente novos pontos
de quebra para reproduzir uma composição já atendida pelos padrões existentes.
