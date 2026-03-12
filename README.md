🍕 LaPizza

LaPizza é uma aplicação full stack de pedidos online para pizzaria, desenvolvida para demonstrar boas práticas de desenvolvimento frontend, backend, arquitetura monorepo, autenticação, pagamentos e comunicação em tempo real.

O sistema permite que usuários naveguem pelo catálogo de pizzas, façam pedidos online, realizem pagamentos e acompanhem o status do pedido em tempo real, enquanto administradores gerenciam produtos e pedidos através de um painel administrativo.

🧠 Visão Geral

Autenticação segura com JWT

Pagamentos integrados com Stripe

Comunicação em tempo real com Socket.IO

Estado global no frontend com Zustand

Validação de dados com Zod

ORM moderno com Prisma

Testes automatizados com Jest

Arquitetura monorepo

Dashboard administrativo

🛠️ Stack Tecnológica
Backend

Node.js

Express.js

TypeScript

Prisma

JSON Web Token

bcrypt

Socket.IO

Stripe

Testes:

Jest

Supertest

Frontend

React

Vite

TypeScript

Zustand

Axios

Zod

Socket.IO

Tailwind CSS

Bibliotecas adicionais:

React Toastify

React Slick

React Modal

AOS

FontAwesome / React Icons

🧱 Arquitetura

O projeto utiliza arquitetura monorepo, permitindo compartilhar código entre aplicações e manter uma organização escalável.

LaPizza-Monorepo
│
├── Apps
│   ├── Back-End
│   ├── Front-End
│   └── Dashboard
│
├── Packages
│   ├── hooks
│   ├── services
│   └── shared utils
Backend

O backend é organizado por módulos de domínio:

auth → autenticação de usuários
products → gerenciamento de produtos
orders → criação e gerenciamento de pedidos
payments → integração com Stripe

Cada módulo possui:

controllers

services

rotas

validações

Frontend

O frontend segue uma separação baseada em:

páginas

componentes reutilizáveis

stores globais

serviços de API

💳 Fluxo de Pagamento

O sistema utiliza Stripe para processar pagamentos.

Fluxo implementado:

usuário cria um pedido

backend gera sessão de pagamento

usuário é redirecionado para checkout Stripe

pagamento é confirmado

pedido é atualizado no sistema

📡 Comunicação em Tempo Real

A atualização de pedidos utiliza Socket.IO.

Isso permite:

atualização automática do status do pedido

comunicação instantânea entre backend e dashboard

⚡ Funcionalidades

cadastro e login de usuários

catálogo de pizzas

carrinho de compras

pedidos online

pagamentos com Stripe

dashboard administrativo

atualização de pedidos em tempo real

🧪 Testes

O projeto possui testes automatizados utilizando Jest e Supertest.

npm run test
🚀 Como rodar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/Dev-Rafaael/LaPizza-Monorepo.git
2️⃣ Instalar dependências
npm install
Rodar Backend
cd Apps/Back-End
npm run start:dev
Rodar Frontend
cd Apps/Front-End
npm run dev
🎯 Objetivo do Projeto

O LaPizza foi desenvolvido para demonstrar:

desenvolvimento full stack

organização de projetos monorepo

autenticação segura

integração com pagamentos

comunicação em tempo real

boas práticas de arquitetura

👨‍💻 Autor

Desenvolvido por Dev Rafael

GitHub
https://github.com/Dev-Rafaael

