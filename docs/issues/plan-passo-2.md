# Plano do Passo 2: Preparar arquivos de Figma de referência e protótipos

**Status atual:** Em andamento. O índice inicial de protótipos já está versionado em [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml), mas os arquivos no Figma ainda precisam ser criados/atualizados para refletir todas as variações descritas neste plano.

## Visão geral
Construir um conjunto controlado de arquivos de Figma que cubra os componentes e variações prioritárias, permitindo validar o parser e o gerador de código.

## Resultados esperados
- Lista de arquivos de Figma com permissão de leitura e tokens configurados para o projeto.
- Páginas de exemplo cobrindo layouts responsivos, estados de componentes e diferentes estruturas de hierarquia.
- Documentação de anotações em cada arquivo indicando a intenção de cada componente para facilitar o mapeamento.

## Atividades principais
1. Criar ou duplicar arquivos no Figma seguindo os padrões definidos no Passo 1.
2. Organizar frames por caso de uso (landing page, formulário simples, componente dinâmico) garantindo cobertura mínima.
3. Inserir notas e descrições nos frames para orientar o parser sobre nomes e variantes.
4. Registrar no repositório um índice dos arquivos com links de acesso e proprietários responsáveis.

## Dependências
- Conclusão do Passo 1 para utilizar tokens e componentes aprovados.
- Acesso a contas do Figma com permissão para criar e compartilhar arquivos.

## Critérios de aceite
- Índice de arquivos disponível em `docs/` contendo links, responsáveis e data de atualização. ✅ Coberto por [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml).
- Cobertura de pelo menos três tipos de páginas/componentes distintos nos protótipos. ⏳ Aguardando criação/atualização dos arquivos no Figma.
- Confirmação de que todos os arquivos podem ser acessados via API com o token de serviço. ⏳ Depende da criação do cliente Figma e de tokens válidos (placeholders por enquanto).

## Riscos e mitigação
- **Risco:** Falta de permissão adequada no Figma.
  - **Mitigação:** Solicitar convites e validar tokens antes de finalizar o passo.
- **Risco:** Protótipos não representarem casos reais.
  - **Mitigação:** Revisar com stakeholders e incluir feedback de equipes de produto.

## Estimativa
- Esforço estimado de 2 a 3 dias úteis, considerando revisões com o time de design.
