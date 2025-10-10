# Módulo de configuração

Este diretório concentra o código responsável por interpretar arquivos YAML de projetos, validar campos obrigatórios e expor utilitários para outras partes da CLI.

## Arquivos principais
- `esquema.ts`: definição do esquema Zod utilizado para validar os dados carregados.
- `leitor-projetos.ts`: funções para localizar, ler e normalizar arquivos de configuração.
- `erros.ts`: classes de erro dedicadas a tornar as mensagens mais amigáveis.

## Diretrizes
- Mantenha o esquema e os tipos sincronizados com o guia em `docs/configuracao-projetos.md`.
- Ao adicionar novos campos, atualize as mensagens de erro e a documentação correspondente.
- Escreva testes unitários sempre que o comportamento de validação for expandido.
