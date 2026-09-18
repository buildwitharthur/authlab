/** @type {import("prettier").Config} */
const config = {
    // Sintaxe
    semi: true,
    singleQuote: true,
    jsxSingleQuote: false,
    quoteProps: 'as-needed',

    // Indentação
    tabWidth: 4,
    useTabs: false,

    // Linhas
    printWidth: 80,
    endOfLine: 'lf',

    // Estruturas
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',

    // Objetos
    objectWrap: 'preserve',
};

export default config;
