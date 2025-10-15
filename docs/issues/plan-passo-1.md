# Plano do Passo 1: Definir biblioteca base de componentes e estilos

**Status atual:** Concluído. O catálogo consolidado está implementado em [`src/componentes/`](../componentes/base-biblioteca.md) e documentado no guia de componentes. Ajustes futuros devem atualizar simultaneamente o código, o arquivo [`config/tokens/tema-padrao.yaml`](../../config/tokens/tema-padrao.yaml) e este plano.

## Visão geral
Estabelecer a base visual e arquitetural dos componentes que serão gerados a partir dos arquivos do Figma, definindo tokens de design, padrões de layout e bibliotecas de estilo preferenciais.

## Resultados esperados
- Catálogo inicial de componentes alvo em React/Next.js com suas responsabilidades. ✅ Implementado em [`src/componentes/catalogo-base.ts`](../../src/componentes/catalogo-base.ts).
- Conjunto de tokens de design (cores, tipografia, espaçamento) alinhados ao que será interpretado do Figma. ✅ Disponível em [`config/tokens/tema-padrao.yaml`](../../config/tokens/tema-padrao.yaml).
- Decisão documentada sobre a tecnologia de estilização (CSS Modules, Tailwind ou styled-components) e diretrizes de uso. ✅ `styled-components` definido como padrão e registrado nos documentos.

## Atividades principais
1. Mapear componentes recorrentes nos arquivos de Figma de referência.
2. Selecionar a abordagem de estilização mais adequada ao pipeline (comparando CSS Modules, Tailwind e styled-components).
3. Definir tokens de design padronizados e publicar em `templates/` ou `config/`.
4. Documentar diretrizes de composição de componentes e estados (hover, foco, responsividade).

## Dependências
- Acesso a pelo menos dois arquivos de Figma representativos do escopo alvo.
- Alinhamento com stakeholders sobre branding e restrições de UI.

## Critérios de aceite
- Documento na pasta `docs/` descrevendo componentes e tokens aprovados. ✅ [`docs/componentes/base-biblioteca.md`](../componentes/base-biblioteca.md).
- Decisão sobre biblioteca de estilos registrada e justificada. ✅ Seção "Comparação de estratégias de estilização".
- Disponibilização de um arquivo de configuração inicial com os tokens. ✅ [`config/tokens/tema-padrao.yaml`](../../config/tokens/tema-padrao.yaml).

## Riscos e mitigação
- **Risco:** Divergência entre designers e desenvolvedores.
  - **Mitigação:** Sessões de revisão conjunta e aprovação antes da implementação do parser.
- **Risco:** Escolha de biblioteca de estilos que dificulte o gerador.
  - **Mitigação:** Protótipos comparativos simples para validar viabilidade.

## Estimativa
- Esforço concentrado em 1 sprint curta (3 a 4 dias úteis).
