# Configurações declarativas

O diretório `config/` abriga arquivos necessários para parametrizar o comportamento do gerador e do fluxo de deploy. Aqui ficam definições reutilizáveis que podem ser compartilhadas entre ambientes ou equipes.

## Estrutura atual
- `projetos/`: coleção de arquivos YAML que descrevem projetos do Figma e seus destinos na Vercel.
- `tokens/`: temas de design aprovados com paletas, tipografia e espaçamentos consumidos pelo gerador.

## Convenções
- Utilize formatos declarativos (YAML ou JSON) com indentação consistente de dois espaços.
- Nunca armazene credenciais reais. Use placeholders claros (por exemplo, `token_figma_exemplo`).
- Ao adicionar novos arquivos, atualize o README correspondente no subdiretório.
