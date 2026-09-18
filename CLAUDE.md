# Padrões do AuthLab

## Escopo destas orientações

Documente decisões, responsabilidades e convenções que orientem novas implementações.
Os guias locais complementam este contrato no escopo de cada pacote ou camada, sem
repetir regras gerais nem contradizer as fronteiras do monorepo.

Mantenha os guias voltados a padrões: explique como implementar e por quê. Evite
catálogos de arquivos, árvores de pastas, inventários de endpoints e relatos de
progresso. Ao mudar uma convenção, atualize também as orientações afetadas.

## Responsabilidades e dependências

- O web cuida de interface, navegação, formulários e consumo HTTP.
- A API valida requisições, aplica autenticação e autorização, define contratos
  públicos e coordena operações de negócio.
- A persistência concentra modelo, migrações e acesso compartilhado ao PostgreSQL.
- A integração de e-mail concentra o acesso ao provedor; a API decide quando enviar.
- A configuração de ambiente centraliza a leitura e a validação dos valores de servidor.
- A base TypeScript compartilha opções dos pacotes Node.js; o web usa configuração
  própria para o navegador e o bundler.

O navegador conversa com a API por HTTP. Não importe implementações da API,
Prisma, configuração secreta ou envio de e-mail no web, inclusive para obter tipos.
Bibliotecas de infraestrutura não dependem da API nem do web; evite ciclos.

Use os exports públicos pelo nome `@authlab/...` e declare dependências internas
com `workspace:*`. Imports relativos e aliases locais não atravessam pacotes.

## Contratos e fontes de verdade

O modelo Prisma define a persistência e as migrações registram sua evolução.
Os schemas Zod da API definem o transporte e originam o OpenAPI. O Kubb gera
tipos, clientes HTTP, hooks React Query e schemas de validação para o web.

Reutilize os contratos gerados quando representarem os dados necessários.
Crie tipos ou validações de apresentação apenas quando a interface precisar de
outro formato, com conversão explícita. Dados de negócio vêm da API; não use
valores fictícios para encobrir falhas de consulta.

Prisma Client, consumo Kubb e árvore de rotas TanStack são gerados. Altere a
origem e execute o gerador correspondente. Mantenha código manual e documentação
fora das saídas que os geradores recriam.

## Convenções de implementação

Use TypeScript estrito, módulos ESM e nomes de código em inglês. Preserve textos
de interface em português e a formatação configurada pelo Prettier.
Prefira responsabilidades pequenas e explícitas; extraia abstrações quando houver
reuso ou complexidade concreta.

O servidor é a autoridade para identidade, permissões e dados privados.
Proteções de navegação no web complementam a experiência, mas não autorizam
requisições. Nunca exponha senhas, hashes ou segredos em respostas e logs.

Estado remoto pertence ao cache React Query, valores de formulário ao React Hook
Form e estado visual ao componente que coordena a interação. Componentes de
apresentação recebem dados e ações por props; componentes que coordenam uma
funcionalidade podem consumir hooks gerados.

## Evolução e verificação

Ao mudar uma funcionalidade, ajuste o modelo persistido quando necessário, defina
entrada, saída e erros na API, regenere o consumo HTTP e revise os consumidores.
Preserve `operationId` estável e mantenha exemplos públicos compatíveis com o JSON
transportado.

Use Node.js compatível com o requisito do workspace e a versão de pnpm fixada
pelo projeto. Execute comandos a partir da raiz, selecionando pacotes com
`--filter`. O Turborepo coordena as tarefas compartilhadas.

- Desenvolvimento: `pnpm dev` ou `pnpm --filter <pacote> dev`.
- Geração de banco: `pnpm --filter @authlab/database db:generate`.
- Migração local: `pnpm --filter @authlab/database db:migrate`.
- Consumo HTTP: `pnpm --filter @authlab/web exec kubb generate`, com a API
  acessível e publicando o contrato atualizado.
- Builds: `pnpm build`.
- Tipos: `pnpm check-types` e, para o web,
  `pnpm --filter @authlab/web exec tsc --noEmit`.

Execute verificações proporcionais à mudança. Confira os scripts dos pacotes:
um comando agregador não garante cobertura de todos eles, e build Vite não
substitui análise de tipos. Mudanças funcionais exigem verificar sucesso, entrada
inválida, falhas esperadas e estados de interface afetados.
