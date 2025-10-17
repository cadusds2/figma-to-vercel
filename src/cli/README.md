# Comandos de linha de comando

O diretório `src/cli/` concentra scripts executados via terminal para interagir com as configurações versionadas no repositório.

## Comandos disponíveis
- `listar-projetos.ts`: apresenta os projetos disponíveis em `config/projetos/` exibindo identificador, nome e destino na Vercel.
- `validar-configuracoes.ts`: valida todos os arquivos YAML conforme o esquema e informa eventuais erros estruturais.
- `gerar-metricas.ts`: consolida os relatórios dos testes automatizados e salva um arquivo pronto para ingestão pelo pipeline de CI/CD.

### Execução
Após instalar as dependências (`npm install`), utilize os scripts de `package.json`:

```bash
npm run listar:projetos
npm run validar:configuracoes
npm run gerar:metricas
```

Também é possível executar diretamente com `ts-node`:

```bash
npx ts-node src/cli/listar-projetos.ts
npx ts-node src/cli/gerar-metricas.ts
```

## Recomendações
- Escreva mensagens claras e em português brasileiro, sempre indicando como corrigir inconsistências.
- Padronize argumentos e opções quando novos comandos forem adicionados.
- Evite duplicar lógica; reutilize os carregadores disponíveis em `src/configuracao/`.
