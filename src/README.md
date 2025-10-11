# Código-fonte da CLI e módulos auxiliares

O diretório `src/` contém a base de código TypeScript responsável por ler configurações, orquestrar comandos de linha e futuramente integrar as etapas de importação, geração e deploy.

## Estrutura atual
- `cli/`: comandos para interação via terminal (listar e validar projetos configurados).
- `configuracao/`: módulo central de leitura, validação e tratamento de erros das configurações declarativas.
- `componentes/`: catálogo base de componentes React, com tokens e estilos padronizados reexportados por `src/index.ts` para consumo externo.
- `index.ts`: ponto de entrada principal para futuras integrações da CLI.

## Convenções de desenvolvimento
- Utilize TypeScript moderno com `strict` habilitado.
- Escreva funções puras sempre que possível e mantenha os módulos pequenos e focados.
- Garanta mensagens de erro em português brasileiro, visando clareza para quem opera a CLI.
- Atualize esta descrição quando novos módulos forem adicionados ou houver mudanças significativas na arquitetura.
