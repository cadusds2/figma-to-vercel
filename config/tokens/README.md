# Temas de tokens de design

Os arquivos deste diretório consolidam os tokens de cores, tipografia e espaçamentos que alimentam o gerador e os componentes base descritos no Passo 1. Cada arquivo deve ser escrito em YAML, utilizando nomes equivalentes aos estilos publicados no Figma para preservar o vínculo entre as fontes.

## Como utilizar
- Alimente o gerador com `CarregadorTokensDesign`, apontando o nome do arquivo sem extensão (por exemplo, `tema-padrao`).
- Garanta que cada bloco (`cores`, `tipografia`, `espacamentos`) esteja presente e siga o esquema definido em `src/configuracao/esquema.ts`.
- Ao ajustar algum valor, sincronize a mudança com o catálogo de componentes para evitar divergências de estados.

## Exemplo disponível
- `tema-padrao.yaml`: tokens oficiais da biblioteca base utilizados pelos componentes prioritários.
