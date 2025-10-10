# Projetos configurados

O diretório `config/projetos/` reúne arquivos YAML que descrevem cada projeto Figma integrado ao pipeline. Cada arquivo contém identificadores do Figma, parâmetros de geração e informações do deploy na Vercel.

## Como organizar
- Crie um arquivo por projeto usando o padrão `nome-do-projeto.yaml` ou `.yml`.
- Utilize chaves claras para identificar componentes (`id`, `nome`, `descricao`) e dados de deploy (`vercel`, `ambientes`).
- Versione apenas dados fictícios ou que possam ser compartilhados publicamente.

## Passos recomendados
1. Duplique um arquivo de exemplo (como `exemplo-loja.yaml`).
2. Ajuste os campos necessários seguindo o esquema validado pelo módulo de configuração.
3. Execute `npm run validar:configuracoes` para garantir conformidade antes de abrir um PR.
