# Guia de protótipos de referência no Figma

## Objetivo do passo
Este guia descreve como iniciar a execução do Passo 2 do roadmap, preparando arquivos de Figma que cubram os componentes e tokens definidos anteriormente. A intenção é garantir insumos confiáveis para testar o parser e o gerador de páginas automatizadas.

## Estrutura sugerida dos arquivos
Organize os protótipos em um time dedicado do Figma contendo três arquivos principais:

1. **Landing institucional**
   - Contém hero, seções de depoimentos e uma grade responsiva de produtos.
   - Utilize os componentes "Banner de destaque", "Card informativo" e "Botão primário" descritos no catálogo base.
   - Preveja estados de hover e versão mobile em páginas espelhadas.
2. **Fluxo de conversão com formulário**
   - Inclui páginas para formulário simples, confirmação e estado de erro.
   - Emprega os componentes "Campo de entrada", "Grupo de campos" e "Botão secundário" para variações de CTA.
   - Adicione variantes com máscaras de entrada e mensagens de validação.
3. **Biblioteca de componentes dinâmicos**
   - Agrupa variações de "Botão primário", "Botão secundário" e "Card informativo" com interações ricas.
   - Mostra estados `default`, `hover`, `press`, `focus`, `disabled` e versões selecionadas onde aplicável.
   - Serve como referência isolada para testes unitários do parser.

## Anotações obrigatórias
- Nomeie cada frame com o padrão `contexto/pagina/variante` para facilitar o mapeamento automático.
- Insira notas explicando dependências de dados (por exemplo, fontes dinâmicas para listas ou métricas).
- Destaque o uso de tokens por meio de etiquetas (cores, tipografia e espaçamento) para validar aderência ao tema padrão.

## Responsáveis e revisão
- Nomeie um responsável por arquivo e defina revisores de design e engenharia.
- Registre datas de atualização no índice oficial para facilitar auditorias.
- Planeje revisões quinzenais para incorporar feedback de produto e marketing.

## Índice e rastreabilidade
O arquivo [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml) já contém três protótipos de referência com identificadores, links, responsáveis e escopo resumido. Atualize-o sempre que um novo arquivo for criado ou revisado. O gerador automático utilizará esse índice para obter o `file_key` de cada protótipo antes de acionar a API do Figma.

## Campos do índice de protótipos
Mantenha os valores fictícios para evitar exposição de dados sensíveis. Utilize a tabela abaixo como guia ao editar [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml).

| Chave | Propósito | Formato esperado | Observações |
| --- | --- | --- | --- |
| `identificador` | Diferenciar cada entrada no índice e facilitar referências cruzadas com a configuração dos projetos. | Texto curto em formato *slug* (minúsculas, hífens). | Deve ser único dentro da lista `prototipos`. |
| `nome` | Apresentar o nome amigável do protótipo. | Texto livre. | Use títulos claros que indiquem o foco do arquivo. |
| `file_key` | Permitir que a CLI recupere o arquivo no Figma. | Texto sem espaços fornecido pelo Figma. | Não utilizar chaves reais; crie identificadores fictícios coerentes. |
| `link_visualizacao` | Compartilhar o endereço público para revisão. | URL completa iniciando com `https://`. | Utilize links fictícios que apontem para o mesmo `file_key`. |
| `responsavel` | Indicar a pessoa proprietária do protótipo. | Texto livre. | Informe nomes fictícios alinhados ao padrão do repositório. |
| `revisores` | Registrar quem valida o conteúdo. | Lista de textos. | Inclua times ou pessoas fictícias; ao menos um revisor é recomendado. |
| `ultima_atualizacao` | Rastrear a data da última revisão. | Data no formato `AAAA-MM-DD`. | Atualize sempre que houver alteração relevante. |
| `escopo` | Sintetizar as principais seções ou fluxos cobertos. | Lista de textos. | Utilize itens curtos que orientem o time sobre a cobertura do protótipo. |
| `observacoes` | Descrever anotações gerais úteis para a automação. | Texto livre. | Centralize premissas e limitações que impactam o parser. |

## Próximos passos
1. Criar os arquivos no Figma seguindo a estrutura descrita.
2. Preencher o índice YAML com dados fictícios representando os protótipos e responsáveis.
3. Validar manualmente o acesso via token de serviço antes de prosseguir para a automação (utilize placeholders enquanto a autenticação não for automatizada).
