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
