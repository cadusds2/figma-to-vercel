# Issue: Módulo de configuração única para múltiplos projetos Figma

## Contexto
O repositório ainda não possui uma forma padronizada de descrever múltiplos projetos Figma. Para viabilizar geração e deploy automatizados, precisamos de um módulo de configuração que centralize as variáveis de ambiente, metadados de projetos e destinos de publicação na Vercel. O README menciona a necessidade de "configurações declarativas", mas não define formato ou estrutura de arquivos.

## Objetivo
Criar um módulo de configuração única que permita gerenciar diversos projetos Figma a partir de arquivos declarativos nos formatos `.yaml` ou `.yml`, garantindo que o pipeline futuro possa selecionar dinamicamente qual projeto processar.

## Escopo sugerido (única tarefa)
1. Definir esquema de configuração (chaves obrigatórias, tipos, validações) contemplando:
   - Identificadores de arquivo Figma e tokens de acesso.
   - Preferências de conversão (por exemplo, biblioteca de componentes, tokens de design).
   - Metadados de deploy (nome do projeto na Vercel, ambiente, variáveis adicionais).
2. Implementar leitor de configuração que:
   - Reconheça automaticamente arquivos `.yaml` ou `.yml` em um diretório padrão (ex.: `config/projetos`).
   - Forneça API para listar projetos disponíveis e carregar um projeto específico.
   - Valide contra o esquema definido, emitindo erros claros e em português.
3. Atualizar documentação (`README.md` ou novo documento em `docs/`) com:
   - Estrutura de pastas esperada.
   - Exemplo completo de configuração em YAML, com valores fictícios.
   - Orientações sobre como adicionar novos projetos e selecionar qual será processado.

## Critérios de aceitação
- Leitor de configuração suporta `.yaml` e `.yml` sem necessidade de ajustes manuais.
- Validação impede chaves ausentes e valores inválidos, com mensagens amigáveis.
- Documentação descreve o fluxo end-to-end para cadastrar e escolher projetos.
- Exemplos fornecidos não contêm dados reais sensíveis.

## Riscos e dependências
- Dependência futura de bibliotecas para parsing de YAML (avaliar `yaml`/`js-yaml`).
- Necessidade de definir estratégia para armazenar tokens de acesso de forma segura.
- Integração com pipeline de deploy dependerá de etapas ainda não implementadas.
