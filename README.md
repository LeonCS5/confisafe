# === Nome do Projeto ===

 ConfiSafe

# === Nome de Integrantes ===

 Leonam Candido;     

 Renato Aragao;

 Henrique Lourenco;

 Michael Coutinho;

# === Descrição do sistema simulado ===

# CONFISAFE – Vitrine Digital (Landing Page)

O **CONFISAFE** é uma solução acadêmica voltada para a gestão de segurança em **espaços confinados**, em conformidade com a **NR-33 (Norma Regulamentadora 33)**.

Este repositório contém a **Vitrine Digital** da plataforma: um site público que apresenta a proposta do sistema e oferece os pontos de entrada para as telas de **Login**, **Cadastro** e demais módulos da aplicação principal (a serem integrados futuramente com backend e banco de dados).

Projeto desenvolvido no contexto do curso de **Análise e Desenvolvimento de Sistemas (ADS)**.

---

## 🎯 Objetivos do Projeto

- Apresentar, de forma clara e visual, a proposta do sistema CONFISAFE.  
- Destacar os módulos centrais da solução (monitoramento, controle de acesso, EPIs, relatórios, treinamentos).  
- Servir como **Portal de Acesso** à plataforma (interfaces de login, cadastro e dashboard inicial).  
- Organizar a estrutura front-end do projeto para facilitar evolução futura (integração com APIs, serviços e banco de dados).

---

## ✨ Principais Funcionalidades da Vitrine Digital

- **Página Inicial (`index.html`)**
  - Apresentação em alto nível da solução.
  - Botão de *Call to Action* (**“Acessar o Sistema”**).
  - Carrossel/slider destacando os módulos principais (implementado em `js/carrosel.js`).

- **Dashboard / Interface Inicial (`pages/inicial.html`)**
  - Tela inicial após o acesso ao sistema.
  - Comportamentos e navegação controlados em `js/inicial.js` e `js/interface-dashboard.js`.
  - Uso de menu lateral e cabeçalho global para acesso rápido aos módulos.

- **Autenticação (front-end)**
  - **Login:** página `pages/login.html` com estilos em `css/login.css` e lógica em `js/login.js`.  
  - **Cadastro:** página `pages/cadastro.html` com estilos em `css/cadastro.css` e lógica em `js/cadastro.js`.  
  > *Obs.: a autenticação ainda é apenas visual; não há integração com backend ou banco de dados.*

- **Módulos de Negócio (telas simuladas)**  
  Todas as telas abaixo são protótipos front-end representando partes do sistema:
  - **Controle de Acesso**  
    - Página: `pages/controle-acesso.html`  
    - Estilos: `css/controle-acesso.css`  
    - Scripts: `js/controle-acesso.js`
  - **Gestão de EPIs**  
    - Páginas: `pages/epis.html`, `pages/gestao-epis.html`  
    - Estilos: `css/epis.css`, `css/gestao-epis.css`  
    - Scripts: `js/epis.js`, `js/gestao-epis.js`
  - **Relatórios**  
    - Página: `pages/relatorio.html`  
    - Estilos: `css/relatorio.css`  
    - Scripts: `js/relatorio.js`
  - **Treinamentos**  
    - Página: `pages/treinamento.html`  
    - Estilos: `css/treinamentos.css`  
    - Scripts: `js/treinamento.js` e `js/treinamentos.js`
  - **Configurações do Sistema**  
    - Página: `pages/configuracoes.html`  
    - Estilos: `css/configuracoes.css`  
    - Script: `js/configuracoes.js`

- **Contato**
  - Página de contato/apoio ao usuário: `pages/contato.html`  
  - Estilos em `css/contato.css` e script em `js/contato.js`.

- **Componentes Visuais Globais**
  - **Menu lateral**, **cabeçalho**, cores e estilos reutilizáveis:
    - `css/header-global.css`  
    - `css/menu-lateral.css`  
    - `css/cores-globais.css`  
    - `css/style.css` (estilos gerais)

> 🔒 **Importante:** todo o comportamento é implementado no lado do cliente (HTML, CSS e JavaScript).  
> Ainda **não há autenticação real, persistência de dados ou integração com APIs** – todas as telas funcionam como protótipos prontos para conexão futura com o backend.

---

## 📂 Estrutura do Projeto

```text
confisafe/
├── assets/
│   ├── img/                      # Imagens dos módulos, ícones e ilustrações
│   └── vid/                      # Vídeos utilizados na vitrine (fundos e demonstrações)
│
├── css/
│   ├── cadastro.css              # Estilos da tela de cadastro
│   ├── configuracoes.css         # Estilos da tela de configurações
│   ├── contato.css               # Estilos da tela de contato
│   ├── controle-acesso.css       # Estilos da tela de controle de acesso
│   ├── cores-globais.css         # Paleta de cores e variáveis globais
│   ├── epis.css                  # Estilos da tela de EPIs
│   ├── gestao-epis.css           # Estilos da tela de gestão de EPIs
│   ├── header-global.css         # Cabeçalho global reutilizável
│   ├── home.css                  # Estilos da página inicial (index.html)
│   ├── inicial.css               # Estilos do dashboard / página inicial interna
│   ├── login.css                 # Estilos da tela de login
│   ├── menu-lateral.css          # Estilos do menu lateral
│   ├── relatorio.css             # Estilos da tela de relatórios
│   ├── style.css                 # Estilos gerais/auxiliares
│   └── treinamentos.css          # Estilos da tela de treinamentos
│
├── js/
│   ├── cadastro.js               # Comportamento da tela de cadastro
│   ├── carrosel.js               # Lógica do carrossel da página inicial
│   ├── configuracoes.js          # Scripts da tela de configurações
│   ├── contato.js                # Scripts da tela de contato
│   ├── controle-acesso.js        # Scripts da tela de controle de acesso
│   ├── epis.js                   # Scripts da tela de EPIs
│   ├── gestao-epis.js            # Scripts da tela de gestão de EPIs
│   ├── inicial.js                # Scripts do dashboard inicial
│   ├── interface-dashboard.js    # Comportamentos e navegação do dashboard
│   ├── login.js                  # Scripts da tela de login
│   ├── relatorio.js              # Scripts da tela de relatórios
│   ├── treinamento.js            # Scripts da tela de treinamentos
│   └── treinamentos.js           # Lógica complementar de treinamentos (listas, filtros etc.)
│
├── pages/
│   ├── cadastro.html             # Tela de cadastro de usuário
│   ├── configuracoes.html        # Tela de configurações do sistema
│   ├── contato.html              # Tela de contato
│   ├── controle-acesso.html      # Tela de controle de acesso
│   ├── epis.html                 # Tela de EPIs
│   ├── gestao-epis.html          # Tela de gestão de EPIs
│   ├── inicial.html              # Dashboard / interface inicial interna
│   ├── login.html                # Tela de login
│   ├── relatorio.html            # Tela de relatórios
│   └── treinamento.html          # Tela de treinamentos
│
├── index.html                    # Página principal (homepage / vitrine pública)
└── README.md                     # Documentação do projeto
