# Padrões de configuração de ambiente

## Responsabilidade e fronteiras

Centralize a leitura e a validação da configuração de servidor com
`@t3-oss/env-core` e Zod. Consumidores importam `env` por `@authlab/env`;
não espalhe acessos a `process.env`, defaults e conversões entre integrações.

A validação acontece na importação. Carregue o ambiente antes de importar
consumidores; este pacote lê o processo, enquanto os comandos de execução
carregam a configuração local.

Mantenha este contrato exclusivo do servidor e sem dependências de negócio.
Configuração pública do navegador exige um contrato separado, contendo apenas
valores que possam ser expostos ao usuário.

## Validação e defaults

Declare tipos, limites e formatos adequados a cada valor. Faça coerções
explicitamente, como texto para porta numérica, e restrinja opções enumeradas.
Strings vazias são tratadas como ausência.

Use defaults somente quando forem válidos para o contexto esperado. Segredos
de desenvolvimento não servem como credenciais de implantação. Não versione
segredos nem os inclua em exemplos, logs ou mensagens públicas.

Uma variável opcional permite validar o ambiente sem ela, mas não garante
funcionamento da integração. Considere clientes inicializados durante a
importação e configure suas dependências antes de carregá-los.

A existência de uma variável no schema não aplica a configuração sozinha:
o consumidor responsável precisa usar seu valor tipado.

## Evolução

Ao adicionar ou mudar configuração:

1. Defina nome, tipo, obrigatoriedade, validação e default no contrato de servidor.
2. Atualize o exemplo de configuração local com valores fictícios.
3. Consuma o valor tipado na integração responsável.
4. Confira os efeitos sobre todos os consumidores, incluindo ferramentas de banco
   que importam o mesmo contrato.

Uma variável obrigatória afeta todos os importadores, mesmo os que não usam
diretamente a integração correspondente. Evite acoplamento acidental entre
configuração e regras de negócio.
