# Validação de formulários

## Responsabilidade

Os schemas desta camada descrevem os valores aceitos pelos formulários e as mensagens apresentadas
ao usuário. Use Zod e exporte o tipo de valores com `z.infer`, evitando interfaces manuais que
repitam a estrutura do schema.

Os formulários consomem os schemas por `zodResolver` do React Hook Form. Preserve mensagens claras
em português e valores iniciais compatíveis com os tipos de campo.

## Padrões de validação

- Normalize nome e e-mail com `trim` quando espaços nas extremidades não fizerem parte do valor.
- Não aplique `trim` ou outra normalização silenciosa à senha.
- Expresse obrigatoriedade e formato com mensagens específicas por campo.
- Represente escolhas binárias como booleanos e forneça seu valor inicial no formulário.
- Diferencie cadastro de entrada: cadastro exige senha de pelo menos oito caracteres; entrada
  exige uma senha informada, sem presumir a política de criação de novas credenciais.

## Fronteira com API e banco

A validação do navegador oferece feedback, mas o servidor continua responsável por validar toda
entrada e aplicar regras de negócio. Os schemas daqui não são compartilhados diretamente com a API.
Os schemas gerados pelo Kubb descrevem o transporte HTTP e têm outra fonte de verdade.

O cadastro visual e o contrato HTTP usam `name`, `email`, `password` e `showOnWall`, por isso a página
pode encaminhar os valores validados diretamente ao hook gerado. O modelo persistido usa
`passwordHash` e `showWall`; essas conversões pertencem à API e não devem ser reproduzidas nos
controles do formulário.

Ao mudar um schema, revise o tipo inferido, os valores iniciais, as mensagens mostradas nos campos
e o callback de envio. Alterar a experiência de validação não altera automaticamente o contrato
HTTP ou o modelo persistido.
