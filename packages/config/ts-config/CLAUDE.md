# Padrões de configuração TypeScript

## Escopo

`@authlab/ts-config` compartilha decisões de compilação dos pacotes Node.js como
dependência de desenvolvimento. Consumidores estendem a configuração pública e
mantêm opções particulares em sua extensão local.

Esta base não fornece código de runtime. O web tem configuração própria para
React, DOM e bundler; preserve as diferenças exigidas por cada ambiente.

## Convenções compartilhadas

- Mantenha tipagem estrita e interoperabilidade com as dependências usadas.
- Preserve compatibilidade entre alvo JavaScript, bibliotecas, tipos de Node e
  versão de runtime exigida pelo workspace.
- Configure módulos ESM e resolução compatíveis com a execução em Node.
- Resolva fontes e saída compilada a partir de cada consumidor com
  `${configDir}`, evitando caminhos fixos para um pacote.
- Restrinja aliases ao escopo local; imports entre pacotes usam exports públicos.
- Mantenha tipos e opções específicos do navegador fora da base de servidor.

Aliases auxiliam a análise de tipos e não reescrevem automaticamente imports
emitidos. Extensões de import, exports e resolução precisam funcionar também
na execução do JavaScript.

## Evolução e verificação

Acrescente uma opção à base somente quando ela expressar uma decisão realmente
compartilhada. Considere seu efeito em todos os consumidores e a compatibilidade
com a versão de TypeScript do workspace.

Ao alterar a base, execute verificações de tipos e builds dos consumidores.
Quando a mudança afetar módulos, aliases ou emissão, confira também a execução:
compilar sem erros não garante que o runtime resolva os imports.
