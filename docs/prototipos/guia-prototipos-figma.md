# Guia de protótipos de referência no Figma

## Objetivo do passo
Este guia descreve como iniciar a execução do Passo 2 do roadmap, preparando arquivos de Figma que cubram os componentes e tokens definidos anteriormente. A intenção é garantir insumos confiáveis para testar o parser e o gerador de páginas automatizadas.

## Estrutura sugerida dos arquivos
Organize os protótipos em um time dedicado do Figma contendo três arquivos principais:

1. **Landing institucional**
   - Contém hero, seções de depoimentos e uma grade responsiva de produtos.
   - Utilize os componentes "banner-destaque", "cartao-produto" e "rodape-resumido" documentados no passo anterior.
   - Preveja estados de hover e versão mobile em páginas espelhadas.
2. **Fluxo de conversão com formulário**
   - Inclui páginas para formulário simples, confirmação e estado de erro.
   - Emprega os componentes "campo-texto", "botao-primario" e "alerta-informativo".
   - Adicione variantes com máscaras de entrada e mensagens de validação.
3. **Biblioteca de componentes dinâmicos**
   - Agrupa variações de carrossel, acordião e cartões interativos.
   - Mostra estados ativo/inativo e movimentação automática comentada.
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
Mantenha o arquivo `config/figma/indice-prototipos.yaml` como fonte da verdade com links e metadados dos protótipos. O gerador automático deve ler esse arquivo para obter o `file_key` de cada protótipo antes de acionar a API do Figma.

## Próximos passos
1. Criar os arquivos no Figma seguindo a estrutura descrita.
2. Preencher o índice YAML com dados fictícios representando os protótipos e responsáveis.
3. Validar manualmente o acesso via token de serviço antes de prosseguir para a automação.
