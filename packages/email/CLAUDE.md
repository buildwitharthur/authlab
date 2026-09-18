# Padrões de envio de e-mails

## Responsabilidade e contrato

Concentre o acesso ao Resend neste pacote. Consumidores de servidor usam
`@authlab/email`, sem criar clientes do provedor em handlers nem expor a chave
ao navegador.

A interface pública oferece `sendEmail` e `SendEmailOptions`. As opções e o
resultado seguem o contrato do provedor; não presuma uma abstração independente,
uma fila ou tentativas automáticas.

A configuração vem de `@authlab/env`, e o cliente é criado na importação.
Configure as credenciais antes de carregar a integração. O chamador fornece
remetente, destinatário e conteúdo; o pacote não busca usuários nem aplica um
remetente automaticamente.

## Coordenação e falhas

A API decide quando enviar e como o resultado afeta a operação de negócio.
Inspecione tanto erros retornados pelo provedor quanto exceções: uma Promise
resolvida não comprova envio bem-sucedido, e aceitação pelo provedor não comprova
entrega ao destinatário.

Defina explicitamente se uma falha de envio impede a resposta de sucesso ou é
tratada como efeito secundário. Não afirme que uma falha foi registrada, ignorada
ou compensada sem implementar esse tratamento.

Persistência e envio externo não formam uma transação atômica. Considere o que
já foi persistido antes de propagar uma falha ou repetir a operação. Se houver
necessidade de garantia de entrega ou novas tentativas, implemente a política
e o controle de duplicidade correspondentes.

Mantenha mensagens HTTP e tradução para erros de aplicação na API. Registros de
diagnóstico devem ser suficientes para identificar falhas sem expor credenciais
ou conteúdo privado desnecessário.

## Evolução e verificação

Reutilize o cliente compartilhado e mantenha a integração pequena. Extraia
composição de mensagens quando houver reuso concreto, sem misturar acesso ao
banco com transporte de e-mail.

Ao alterar o envio, confira opções fornecidas, resultado de sucesso, erro
retornado e exceção. Verifique também a consequência para o caso de uso que
disparou a mensagem.
