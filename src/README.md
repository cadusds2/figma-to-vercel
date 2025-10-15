# Código-fonte da CLI e módulos auxiliares

O diretório `src/` contém a base de código TypeScript responsável por ler configurações, carregar tokens e disponibilizar utilitários consumidos tanto pela CLI quanto por futuros geradores.

## Estrutura atual
- `cli/`: comandos de terminal (`listar-projetos.ts` e `validar-configuracoes.ts`) que utilizam o carregador de projetos.
- `configuracao/`: módulo central de leitura, validação de YAML, carregamento de tokens e classes de erro específicas.
- `componentes/`: catálogo base de componentes e funções para montar o tema de `styled-components`.
- `index.ts`: ponto de entrada que reexporta os utilitários para consumo externo.

## Convenções de desenvolvimento
- Utilize TypeScript moderno com `strict` habilitado e evite `any`.
- Escreva funções puras sempre que possível e mantenha os módulos pequenos e focados.
- Garanta mensagens de erro em português brasileiro, visando clareza para quem opera a CLI.
- Atualize esta descrição quando novos módulos forem adicionados ou houver mudanças significativas na arquitetura.
