# Issue: Módulo de configuração única para múltiplos projetos Figma

## Status
Entregue na iteração atual. O módulo está disponível para uso pelos comandos da CLI e pelos demais serviços que precisarem carregar projetos ou tokens de design.

## Contexto
A necessidade original era padronizar a descrição de múltiplos projetos do Figma e seus respectivos destinos de deploy. Antes desta entrega, cada desenvolvedor mantinha arquivos soltos, dificultando validações automáticas e a seleção dinâmica de projetos.

## Resultados alcançados
- **CarregadorConfiguracoesProjetos** (`src/configuracao/leitor-projetos.ts`): localiza arquivos `config/projetos/*.yaml`, valida a estrutura via esquema Zod e expõe métodos para listar identificadores e carregar uma configuração completa.
- **CarregadorTokensDesign** (`src/configuracao/carregador-tokens.ts`): centraliza a leitura dos temas declarados em `config/tokens/`, garantindo mensagens de erro amigáveis quando há problemas de validação.
- **Documentação alinhada**: `docs/configuracao-projetos.md` e o README principal agora explicam como versionar os arquivos e executar a validação automática.

## Evidências
- `npm run listar:projetos` apresenta a listagem correta a partir do arquivo `config/projetos/exemplo-loja.yaml`.
- `npm run validar:configuracoes` executa o carregamento completo e impede inconsistências estruturais.

## Próximos passos
1. Expandir `config/figma/indice-prototipos.yaml` com exemplos adicionais para cobrir mais times internos.
2. Conectar o carregador de tokens ao catálogo em `src/componentes/index.ts`, permitindo gerar temas automaticamente durante o build.
3. Definir no roadmap uma verificação automática dos limiares descritos em `config/metricas/padroes-qualidade.yaml`.
