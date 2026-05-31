# SHAPE DO CHICÃO • CHICA AI

Projeto final com frontend + backend para Vercel.

## Como publicar na Vercel

1. Envie todos os arquivos deste projeto para um repositório GitHub.
2. Importe o repositório na Vercel.
3. Em Settings > Environment Variables, adicione:

OPENAI_API_KEY = sua_chave_da_OpenAI

4. Faça Deploy.
5. O app chamará:
- `/api/gerar-plano`
- `/api/perguntar`

## Segurança

A chave da OpenAI fica apenas no backend da Vercel, nunca no HTML.

## Observação

As respostas fitness são orientativas e não substituem médico, nutricionista ou profissional de educação física.


## PWA no iPhone

Este projeto já está pronto para instalação como PWA.

Arquivos incluídos:
- `manifest.json`
- `sw.js`
- `icon.svg`

### Como instalar no iPhone

1. Publique o projeto na Vercel.
2. Abra o link no Safari.
3. Toque no botão Compartilhar.
4. Escolha "Adicionar à Tela de Início".
5. O app abrirá como aplicativo instalado.

### Importante

O backend da CHICA precisa da variável de ambiente:

OPENAI_API_KEY

Cadastre em:
Vercel > Project > Settings > Environment Variables


## V25 - Evolução, PDF e persistência

Inclui:
- Salvamento local do perfil e plano usando localStorage.
- Cálculo de IMC, faixa de peso saudável, TMB estimada, água e proteína.
- Checklist inicial para a CHICA gerar planos mais assertivos.
- Botão para gerar PDF personalizado usando impressão do navegador.
- Estrutura de reavaliação de 90 dias para comparação futura.

## V26
- Comparação de fotos inicial x 90 dias.
- Gráfico de evolução salvo localmente.
- PDF premium completo com marca Shape do Chicão.
- Registro de peso/IMC.


## V27 - IA de fotos, medidas estimadas e histórico

Novidades:
- Endpoint `/api/analisar-fotos` com análise visual por IA.
- Estimativa aproximada de braço, coxa/perna, peito, glúteo, panturrilha e quadril.
- Comparação inicial x 90 dias.
- Endpoint `/api/dica-do-dia` para dica diária gerada por IA.
- Histórico de ciclos salvo localmente.
- Estrutura preparada para migração futura para banco de dados em nuvem.

Observação importante:
As medidas por foto são estimativas visuais aproximadas e não substituem medição com fita métrica, avaliação física profissional ou acompanhamento de saúde.
