# Envio de e-mails

## Responsabilidade e fronteiras

Este pacote concentra a integração com Resend. O servidor deve usá-lo quando uma operação precisar
enviar e-mail, sem criar clientes do provedor em handlers ou compartilhar a chave com o navegador.

A interface pública oferece `sendEmail` e o tipo `SendEmailOptions`. As opções correspondem às
opções de criação de e-mail do Resend, e o retorno é o resultado do provedor. A abstração atual é
deliberadamente pequena: não existe formato independente do fornecedor, fila, sistema de templates
ou política automática de tentativas.

## Como consumir

- Declare `@authlab/email` como dependência de workspace do pacote consumidor.
- Configure `RESEND_API_KEY` no ambiente de servidor. Ela é validada por `@authlab/env`, e o cliente
  do provedor é criado quando o módulo é importado.
- Forneça remetente, destinatário e conteúdo nas opções da chamada; o pacote não adiciona um
  remetente padrão nem busca usuários no banco.
- Inspecione o resultado, incluindo o erro retornado pelo provedor, além de tratar possíveis
  exceções. A função não converte automaticamente falhas em `AppError`.

O chamador decide quando enviar e como uma falha afeta a operação de negócio. Não trate envio externo
como parte atômica de uma transação PostgreSQL. Caso um fluxo precise de garantias de entrega ou
retentativas, implemente essa política explicitamente antes de depender dela.

## Estado da integração

A API ainda não consome este pacote. O cadastro e as boas-vindas não enviam mensagens atualmente.
Ao integrar esses fluxos, mantenha a decisão de negócio na API e o acesso ao provedor neste pacote.
