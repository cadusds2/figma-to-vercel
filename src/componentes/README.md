# Módulo de componentes base

O diretório `src/componentes/` reúne estruturas declarativas com o catálogo de componentes priorizados e utilitários para montar o tema consumido pelos `styled-components`. Essa base orienta o gerador automático sobre estados obrigatórios, tokens de design utilizados e regras responsivas adotadas pelo projeto.

## Arquivos principais
- `tipos.ts`: tipos e constantes que padronizam a biblioteca de estilização adotada e a estrutura dos componentes.
- `catalogo-base.ts`: lista imutável dos componentes mapeados no Passo 1, com estados, tokens e orientações responsivas.
- `tema-styled.ts`: função pura que transforma os tokens validados em um objeto de tema pronto para os `styled-components`.
- `index.ts`: ponto de reexportação para facilitar o consumo dos itens acima por outros módulos da aplicação.

## Boas práticas
- Sempre referencie tokens pelo caminho completo (`cores.primarias.destaque`) para manter a rastreabilidade com o arquivo YAML.
- Evite duplicar informações: se um estado compartilha tokens com o componente principal, reutilize as mesmas entradas.
- Atualize este README sempre que novos arquivos significativos forem adicionados ao módulo.
