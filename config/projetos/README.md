# Projetos configurados

O diretório `config/projetos/` concentra descrições declarativas dos projetos monitorados pela CLI. Os arquivos são validados por [`CarregadorConfiguracoesProjetos`](../../src/configuracao/leitor-projetos.ts) utilizando o esquema definido em [`src/configuracao/esquema.ts`](../../src/configuracao/esquema.ts).

## Organização
- Utilize nomes em minúsculas separados por hífens (ex.: `loja-virtual.yaml`).
- Armazene apenas dados fictícios e comentários indispensáveis para explicar decisões.
- Mantenha um arquivo por projeto; identidades duplicadas são rejeitadas pela validação automática.

## Campos validados
- `projeto`: identificador único, nome, descrição opcional e etiquetas opcionais.
- `figma`: `arquivoId`, `tokenLeitura` (placeholder), `bibliotecaComponentes` opcional e `tokensDesign` opcionais.
- `preferencias.geracao`: estratégia (`isolados` ou `agrupados`), prefixo e lista de páginas a ignorar (todos opcionais).
- `deploy.vercel`: nome do projeto, ambiente (texto livre), variáveis opcionais e campo opcional `comentarios`.

Consulte o guia completo em [`docs/configuracao-projetos.md`](../../docs/configuracao-projetos.md) para exemplos detalhados.

## Fluxo sugerido
1. Copie [`exemplo-loja.yaml`](exemplo-loja.yaml) e renomeie com o identificador desejado.
2. Ajuste os blocos `projeto` e `figma` com dados fictícios alinhados aos protótipos listados em `config/figma/indice-prototipos.yaml`.
3. Configure `deploy.vercel` indicando o projeto e ambiente da Vercel que receberão o código gerado.
4. Execute `npm run validar:configuracoes` para garantir que o arquivo respeita o esquema e que não existem identificadores duplicados.
