# Issue: Planejamento da implementação do pipeline automatizado

## Contexto
O projeto precisa de um pipeline orquestrado que conecte importação de dados do Figma, parsing para estruturas intermediárias, geração de código e deploy automatizado na Vercel. Até o momento, os documentos existentes cobrem partes isoladas (como configuração de projetos e planos por passos), mas não consolidam um roteiro único de implementação.

## Situação atual
- Existe um plano em quatro passos descrevendo iniciativas de design, parser, gerador e deploy, porém sem uma camada coordenadora que garanta a execução sequencial.
- Não há diretrizes centralizadas sobre como baixar, versionar e empacotar assets vindos do Figma (imagens raster, SVG, fontes) antes da geração de código.
- O fluxo de deploy descrito até agora assume apenas código gerado, sem detalhar como arquivos estáticos serão incorporados ao envio para a Vercel.

## Lacunas
1. Falta um comando único de CLI que orquestre todas as etapas do pipeline (importação, parsing, geração e deploy), definindo:
   - Responsabilidades por etapa (ex.: importação salva respostas brutas da API do Figma; parsing converte para modelos internos; geração cria componentes e manifestos; deploy envia para Vercel).
   - Parâmetros obrigatórios como `--projeto`, `--token-figma`, `--ambiente` e opções de simulação (`--dry-run`), evitando múltiplas chamadas manuais.
   - Estratégia de tratamento de erros e logs para cada fase, permitindo rastrear o que falhou.
2. Inexistência de processo padronizado para download e versionamento de assets do Figma, incluindo:
   - Local padrão para armazenamento (ex.: `assets/<projeto>/<versao>/` com subpastas `imagens/`, `svg/` e `fontes/`).
   - Geração de manifesto de assets (JSON ou YAML) com caminhos públicos que serão consumidos pelo gerador de componentes.
   - Definição de política de versionamento (timestamp ou hash da versão do arquivo Figma) para facilitar rollbacks.
3. Integração ausente dos assets versionados no fluxo de deploy, o que impede garantir que a Vercel receba todos os recursos necessários junto ao código estático.

## Plano de ação
1. **Desenhar a CLI orquestradora** (tarefa única prioritária):
   - Definir interface do comando principal `figma-to-vercel executar` responsável por encadear importação → parsing → geração → deploy.
   - Formalizar em documentação as responsabilidades de cada módulo e os parâmetros aceitos (incluindo variáveis de ambiente opcionais).
   - Implementar contrato de saída (códigos de retorno e estrutura de logs) para facilitar automação em CI.
2. **Estabelecer fluxo de assets**:
   - Criar subcomando `figma-to-vercel assets sincronizar` que faça download dos arquivos raster (PNG/JPEG), vetoriais (SVG) e fontes necessárias, respeitando permissões do Figma.
   - Armazenar assets em `assets/<projeto>/<versao>/`, gerando manifesto `assets/<projeto>/<versao>/manifesto.json` com metadados (tipo, caminho público, uso previsto).
   - Atualizar o gerador de componentes para consumir o manifesto, referenciando caminhos relativos que serão copiados para `public/` durante o build.
   - Registrar processo de limpeza de versões antigas e política mínima de retenção.
3. **Integrar assets ao deploy Vercel**:
   - Incluir etapa na CLI que, antes do deploy, sincronize os assets com a pasta `public/` ou outra pasta configurada para saída estática.
   - Garantir que o comando de deploy receba parâmetros para indicar a versão de assets desejada (`--versao-assets`), permitindo reutilização sem novo download.
   - Documentar como a pipeline da Vercel (via CLI ou API) deve empacotar esses arquivos, incluindo exemplos de configuração de `vercel.json` se necessário.

## Próximos artefatos necessários
- Documento técnico detalhando a CLI orquestradora (`docs/cli/orquestradora.md`) com parâmetros, fluxo e exemplos.
- Especificação do manifesto de assets e processo de sincronização (`docs/assets/fluxo-assets.md`).
- Guia de integração com deploy na Vercel abordando assets e código (`docs/deploy/fluxo-completo.md`).
- Atualização do `README.md` com visão resumida do comando principal e referências para os documentos detalhados.

## Métricas de sucesso
- Execução do comando `figma-to-vercel executar --projeto exemplo --versao-assets atual` completa com logs claros e sem necessidade de etapas manuais intermediárias.
- Deploys na Vercel passam a incluir assets versionados e referenciados corretamente pelos componentes gerados.
- Tempo gasto em configurações manuais reduzido significativamente após adoção da CLI orquestradora.
