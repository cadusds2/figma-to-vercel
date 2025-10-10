# Comandos de linha de comando

O diretório `src/cli/` concentra scripts executados via linha de comando para interagir com o módulo de configuração e, futuramente, com outras etapas do pipeline.

## Comandos atuais
- `listar-projetos.ts`: apresenta os projetos disponíveis na pasta `config/projetos/` com suas descrições.
- `validar-configuracoes.ts`: verifica se todos os arquivos YAML estão de acordo com o esquema definido.

## Recomendações
- Implemente comandos com mensagens claras para usuários que operam a partir do terminal.
- Mantenha a interface consistente, utilizando argumentos e opções padronizadas.
- Garanta tratamento de erros informativo e em português brasileiro.
