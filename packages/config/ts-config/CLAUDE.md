# Base TypeScript para pacotes de servidor

## Quando usar

`@authlab/ts-config` compartilha as decisões de compilação dos pacotes Node.js. API, banco, e-mail e
ambiente o usam como dependência de desenvolvimento e estendem sua configuração pública.
Ele não fornece código de runtime nem uma biblioteca de utilitários.

O web mantém configuração própria para React, DOM e resolução por bundler. Não imponha a base de
servidor ao navegador para eliminar diferenças que refletem runtimes distintos.

## Convenções compartilhadas

- Tipagem estrita e interoperabilidade com dependências existentes.
- Alvo ES2024, bibliotecas JavaScript modernas e tipos de Node.
- Módulos e resolução orientados ao ecossistema Node, cuja compatibilidade deve ser preservada ao
  alterar opções de compilação.
- Diretório de fontes e saída compilada relativos ao pacote consumidor, usando `${configDir}`.
- Alias `@/*` para o escopo de fontes de cada consumidor, sem cruzar fronteiras entre pacotes.

Um alias de TypeScript auxilia a resolução durante análise; ele não reescreve automaticamente os
imports emitidos. Ao mudar aliases ou resolução, verifique também como o runtime executa o resultado.

## Como evoluir

Coloque aqui somente opções realmente compartilhadas pelos consumidores Node. Opções particulares
de um pacote devem permanecer na extensão local. Mantenha dependências específicas de React e Vite
fora desta base.

Toda alteração pode afetar API, banco, e-mail e ambiente ao mesmo tempo. Execute suas verificações
de tipos e builds, considerando a versão de TypeScript usada por cada consumidor. Não conclua que
a aplicação inicia apenas porque a análise de tipos passou; resolução e execução também precisam
continuar compatíveis.
