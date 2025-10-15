# Módulo de configuração

Este diretório concentra o código responsável por interpretar arquivos YAML de projetos, validar campos obrigatórios, carregar temas de tokens e expor utilitários para outras partes da CLI.

## Arquivos principais
- `esquema.ts`: definição dos esquemas Zod utilizados para validar projetos e tokens.
- `leitor-projetos.ts`: funções para localizar, ler e normalizar arquivos de configuração.
- `carregador-tokens.ts`: utilitário para listar temas disponíveis e carregar tokens de design.
- `erros.ts`: classes de erro dedicadas a tornar as mensagens mais amigáveis.

## Diretrizes
- Mantenha os esquemas e tipos sincronizados com os guias em `docs/configuracao-projetos.md` e `config/tokens/README.md`.
- Ao adicionar novos campos, atualize as mensagens de erro e a documentação correspondente.
- Escreva testes unitários sempre que o comportamento de validação ou carregamento for expandido.
