# Projetos configurados

O diretório `config/projetos/` reúne arquivos YAML que descrevem cada projeto Figma integrado ao pipeline. Cada arquivo contém identificadores do Figma, parâmetros de geração e informações do deploy na Vercel.

## Como organizar
- Crie um arquivo por projeto usando o padrão `nome-do-projeto.yaml` ou `.yml`.
- Garanta que o bloco `projeto.` contenha `projeto.identificador`, `projeto.nome`, `projeto.descricao` e, quando necessário, `projeto.etiquetas` para facilitar filtros na CLI.
- Preencha `figma.arquivoId`, `figma.tokenLeitura`, `figma.bibliotecaComponentes` e `figma.tokensDesign` com valores fictícios que representem o cenário alvo.
- Defina `deploy.vercel.projeto`, `deploy.vercel.ambiente` e `deploy.vercel.variaveis` para indicar como o gerador publicará cada build.
- Versione apenas dados fictícios ou que possam ser compartilhados publicamente.

## Passos recomendados
1. Duplique um arquivo de exemplo (como `exemplo-loja.yaml`).
2. Atualize os campos `projeto.identificador` e `figma.arquivoId` para representar o novo protótipo.
3. Ajuste `deploy.vercel.*` conforme o ambiente fictício desejado, mantendo variáveis de ambiente exemplificativas.
4. Execute `npm run validar:configuracoes` para garantir conformidade antes de abrir um PR.
