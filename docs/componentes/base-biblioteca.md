# Catálogo inicial da biblioteca de componentes

Este documento consolida os componentes prioritários identificados nos arquivos de design do Figma. A lista abaixo serve como base para o gerador automático de interfaces, descrevendo comportamentos, estados de interação e orientações responsivas que devem ser respeitados durante a implementação.

## Componentes mapeados

| Componente | Descrição funcional | Estados de interação | Recomendações responsivas |
| --- | --- | --- | --- |
| Botão primário | Ação principal em formulários e chamadas diretas. | `default`, `hover`, `press`, `focus` com realce da borda e `disabled` com opacidade reduzida. | Largura mínima de 48px, preenchimento horizontal proporcional ao ponto de quebra (8px em mobile, 12px em desktop). |
| Botão secundário | Suporte a ações complementares. | Idêntico ao botão primário, mas com contorno em vez de preenchimento. | Mantém tipografia idêntica ao primário; altura nunca inferior a 40px para acessibilidade. |
| Campo de entrada | Entrada de texto de linha única. | `default`, `focus` com sombra sutil, `erro` com borda vermelha e `disabled`. | Em dispositivos estreitos ocupa 100% da largura; acima de 768px limita-se a 480px. |
| Grupo de campos | Wrapper para organizar campos relacionados. | Realça estado de erro quando qualquer filho estiver inválido. | Empilha itens verticalmente até 768px e alterna para duas colunas acima disso. |
| Card informativo | Exibe resumo de métricas ou conteúdos curtos. | `default`, `hover` com leve elevação e `selecionado` com destaque de cor. | Espaçamento interno proporcional ao breakpoint (16px mobile, 24px tablet, 32px desktop). |
| Banner de destaque | Bloco hero com imagem e CTA. | `default` e `com vídeo` que inclui reprodução embutida. | Alterna layout para coluna quando a largura disponível é inferior a 960px; CTA sempre abaixo do texto em telas pequenas. |

## Diretrizes de interação
- Foco sempre visível com contraste mínimo de 3:1 em relação ao contexto.
- Animações limitadas a 200ms para preservar a percepção de responsividade.
- Estados de erro devem combinar cor e texto explicativo curto.

## Orientações responsivas gerais
- Utilizar sistema de colunas fluidas de 12 divisões a partir de 1024px.
- Em breakpoints inferiores (mobile e tablet), priorizar empilhamento vertical e espaçamentos duplos apenas quando indispensável.
- Componentes textuais devem respeitar hierarquias tipográficas escalonadas (título, subtítulo, corpo, legenda) conforme tokens definidos.

## Comparação de estratégias de estilização

| Alternativa | Pontos fortes | Limitações | Observações |
| --- | --- | --- | --- |
| CSS Modules | Encapsulamento automático, tipagem melhor integrada ao TypeScript. | Necessita convenções rígidas para nomear arquivos e classes. | Exige configuração adicional do gerador para interpolar tokens. |
| Tailwind CSS | Rapidez de prototipagem e consistência utilitária. | Dependência de classes utilitárias no markup, reduz legibilidade dos componentes complexos. | Necessitaria plugin próprio para refletir tokens do Figma, aumentando manutenção. |
| styled-components | Estilização contextual dentro do componente, suporte direto a theming. | Overhead em runtime e necessidade de Babel para otimizações. | Integração direta com tokens e variações dinâmicas por props.

**Decisão:** adotar **styled-components** para o catálogo inicial, pois facilita mapear tokens temáticos e gerar estados de interação com propriedades dinâmicas sem ampliar o acoplamento entre marcação e estilo. CSS Modules permanece como alternativa para componentes muito estáticos.

## Próximos passos para o gerador
- Incluir regras de lint que alertem sobre estados não previstos nos tokens.
- Automatizar a criação de stories com base na tabela de componentes e estados descrita acima.

---
**Referência de tokens:** o arquivo `config/tokens/tema-padrao.yaml` centraliza cores, tipografia e espaçamentos. O gerador automático deve importar esses valores antes de compor as variações de styled-components, garantindo que os estados de interação descritos aqui utilizem as mesmas definições.
