# Issue: Planejamento da implementação

## Contexto
Este documento consolida os pontos críticos que precisam ser estruturados para que o pipeline "Figma → Gerador → Deploy" funcione de forma coordenada. O foco está em alinhar responsabilidades, dependências técnicas e próximos artefatos para garantir uma execução fluida.

## Lacunas
- Falta um comando de linha de comando principal (`cli orchestrador`) que dispare sequencialmente as etapas de importação dos dados do Figma, parsing dos arquivos, geração do projeto e disparo do deploy na Vercel. É necessário definir responsabilidades claras para cada etapa, parâmetros obrigatórios (token do Figma, ID do arquivo, caminho de saída, ambiente de deploy) e como relatar erros.
- Não há diretrizes completas sobre como baixar e versionar os assets do Figma (imagens raster, SVGs e fontes). Precisamos definir pasta de armazenamento (`assets/figma` dentro do repositório), convenção de nomes, estratégia de cache e ligação com o gerador de código.

## Plano de ação
1. Especificar o comando `figma-vercel sync` como porta de entrada da CLI orquestradora, detalhando:
   - Sequência exata das fases: `importar-figma` → `parsear-componentes` → `gerar-codigo` → `publicar-vercel`.
   - Parâmetros esperados (variáveis de ambiente ou flags): `--token-figma`, `--arquivo-figma`, `--saida`, `--ambiente`, `--forcar-deploy`.
   - Responsabilidades de cada módulo invocado (conector Figma, parser de tokens/componentes, gerador Next.js, integrador Vercel) e formato dos logs.
2. Adicionar subcomando ou etapa intermediária para gestão dos assets:
   - **Download**: realizar requisições às APIs do Figma para imagens raster e SVG, salvando os arquivos em `assets/figma/{tipo}/{versao}/`.
   - **Versionamento**: registrar metadados (hash, timestamp, origem) em um manifesto (`assets/manifesto.json`) consumido pelo gerador para resolver referências.
   - **Referências no gerador**: criar convenção de importação (ex.: `@assets/figma/...`) garantindo atualização automática quando o manifesto mudar.
   - **Integração ao deploy**: incluir os assets no pacote de build enviado à Vercel (via configuração de `vercel.json` e verificação no `postbuild`).
3. Atualizar a documentação existente (README e guias de fluxo) com o passo a passo único da CLI, destacando variáveis obrigatórias e exemplos de uso.

## Resultados esperados
- Pipeline automatizado com execução consistente via CLI única.
- Assets versionados e empacotados de maneira previsível, reduzindo inconsistências entre ambientes.

## Próximos artefatos necessários
- Documento de especificação da CLI orquestradora (`docs/cli/orquestradora.md`) descrevendo comandos, flags e tratamento de erros.
- Guia de fluxo de assets (`docs/arquitetura/fluxo-assets.md`) detalhando armazenamento, manifesto e integração com o deploy na Vercel.
- Scripts ou protótipos iniciais para validação da extração e versionamento dos assets diretamente na CLI.
