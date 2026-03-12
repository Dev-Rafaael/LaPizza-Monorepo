# 🍕 LaPizza

**LaPizza** é uma aplicação **full stack de pedidos online para pizzaria**, desenvolvida para demonstrar boas práticas de desenvolvimento **frontend, backend, arquitetura monorepo, autenticação, pagamentos e comunicação em tempo real**.

O sistema permite que usuários naveguem pelo catálogo de pizzas, façam pedidos online, realizem pagamentos e acompanhem o status do pedido em tempo real, enquanto administradores gerenciam produtos e pedidos por meio de um painel administrativo.

---

# 🧠 Visão Geral

* Autenticação segura com JWT
* Pagamentos integrados com Stripe
* Comunicação em tempo real com Socket.IO
* Estado global no frontend com Zustand
* Validação de dados com Zod
* ORM moderno com Prisma
* Testes automatizados com Jest
* Arquitetura monorepo
* Dashboard administrativo

---

# 🛠️ Stack Tecnológica

## Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* JSON Web Token (JWT)
* bcrypt
* Socket.IO
* Stripe

### Testes

* Jest
* Supertest

---

## Frontend

* React
* Vite
* TypeScript
* Zustand
* Axios
* Zod
* Socket.IO
* Tailwind CSS

### Bibliotecas adicionais

* React Toastify
* React Slick
* React Modal
* AOS
* FontAwesome / React Icons

---

# 🧱 Arquitetura

O projeto utiliza **arquitetura monorepo**, permitindo compartilhar código entre aplicações e manter uma organização escalável.

```
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
│   └── shared-utils
```

---

## Backend

O backend é organizado por **módulos de domínio**:

* **auth** → autenticação de usuários
* **products** → gerenciamento de produtos
* **orders** → criação e gerenciamento de pedidos
* **payments** → integração com Stripe

Cada módulo possui:

* controllers
* services
* rotas
* validações

---

## Frontend

O frontend segue uma separação baseada em:

* páginas
* componentes reutilizáveis
* stores globais
* serviços de API

---

# 💳 Fluxo de Pagamento

O sistema utiliza **Stripe** para processar pagamentos.

Fluxo implementado:

1. Usuário cria um pedido
2. Backend gera a sessão de pagamento
3. Usuário é redirecionado para o checkout do Stripe
4. Pagamento é confirmado
5. O pedido é atualizado no sistema

---

# 📡 Comunicação em Tempo Real

A atualização de pedidos utiliza **Socket.IO**.

Isso permite:

* atualização automática do status do pedido
* comunicação instantânea entre backend e dashboard

---

# ⚡ Funcionalidades

* Cadastro e login de usuários
* Catálogo de pizzas
* Carrinho de compras
* Pedidos online
* Pagamentos com Stripe
* Dashboard administrativo
* Atualização de pedidos em tempo real

---

# 🔐 Contas de Teste

Para testar a aplicação, utilize as seguintes contas:

### Usuário

Email

```
demouser@demo.com
```

Senha

```
demo123
```

### Administrador

Email

```
admin@access.com
```

Senha

```
admin123
```

---

# 🧪 Testes

O projeto possui testes automatizados utilizando **Jest** e **Supertest**.

```bash
npm run test
```

---

# 🚀 Como rodar o projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Dev-Rafaael/LaPizza-Monorepo.git
```

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## Rodar Backend

```bash
cd Apps/Back-End
npm run start:dev
```

---

## Rodar Frontend

```bash
cd Apps/Front-End
npm run dev
```

---

# 🎯 Objetivo do Projeto

O **LaPizza** foi desenvolvido para demonstrar:

* desenvolvimento **full stack**
* organização de projetos **monorepo**
* autenticação segura
* integração com pagamentos
* comunicação em tempo real
* boas práticas de arquitetura

---

# 👨‍💻 Autor

**Dev Rafael**

GitHub
https://github.com/Dev-Rafaael
