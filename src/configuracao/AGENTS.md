# Instruções para `src/configuracao/`
- Garanta que toda validação use o esquema central em `esquema.ts` para evitar duplicidade.
- Centralize mensagens de erro em português e reutilize constantes quando fizer sentido.
- Evite efeitos colaterais: funções devem receber dados e retornar resultados ou lançar erros específicos.
- Sempre que alterar o esquema, atualize o README deste diretório e o guia em `docs/`.
