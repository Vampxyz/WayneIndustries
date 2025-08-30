# 🌍 WayneIndustries / Indústrias Wayne

<div align="center">
    <img src="https://img.shields.io/badge/english-%E2%86%92-blue" alt="English">
    <img src="https://img.shields.io/badge/português-%E2%86%92-green" alt="Português">
</div>

<details open>
<summary><h2>🇧🇷 Versão em Português</h2></summary>

## 🚀 Sobre

Este é um sistema de gerenciamento de segurança e recursos para uma empresa fictícia, as Indústrias Wayne. O projeto foi desenvolvido com uma arquitetura robusta e escalável, utilizando front-end e back-end separados para garantir a segurança dos dados e uma experiência de usuário dinâmica.

### Principais Funcionalidades:

- **Sistema de Login e Autenticação:** Permite que usuários com diferentes cargos (administrador, gerente, funcionário) acessem áreas restritas do sistema.
- **Controle de Acesso (Access Control):** Interface exclusiva para administradores gerenciarem usuários, com funcionalidades de visualização, adição, edição e exclusão de dados.
- **Gestão de Recursos (Resource Management):** Interface para gerenciar inventário de equipamentos, com cards interativos, barra de pesquisa e um modal de filtro dinâmico por categoria.

## 💻 Tecnologias

O projeto foi construído com a seguinte stack:

- **Front-end:**
  - **HTML5:** Para a estrutura das páginas.
  - **CSS3:** Para a estilização e responsividade da interface.
  - **JavaScript (ES6+):** Para a lógica de interação, requisições assíncronas (`fetch`) e manipulação dinâmica do DOM.
- **Back-end (API):**
  - **Python:** Linguagem de programação principal.
  - **Flask:** Um microframework Python utilizado para criar a API RESTful.
  - **Flask-SQLAlchemy:** Extensão para o Flask que facilita a interação com o banco de dados.
  - **SQLite:** Um banco de dados leve e portátil, usado para armazenar os dados de forma permanente em um único arquivo (`database.db`).

## ⚙️ Instalação e Execução

Siga os passos abaixo para clonar o repositório, instalar as dependências e executar a aplicação.

### Pré-requisitos

- Python 3.8+
- Git

### 1\. Clonar o Repositório

Abra seu terminal e execute os seguintes comandos:

```
git clone https://github.com/Vampxyz/WayneIndustries.git
cd WayneIndustries
```

### 2\. Criar e Ativar o Ambiente Virtual

Para isolar as dependências do projeto, crie e ative um ambiente virtual:

## Cria o ambiente virtual

```
python -m venv venv
```

## Ativa o ambiente virtual (Windows)

```
venv\\Scripts\\activate
venv/Scripts/activate
```

## Ativa o ambiente virtual (macOS/Linux)

```
source venv/bin/activate
```

### 3\. Instalar as Dependências

Agora, você vai instalar todas as bibliotecas necessárias usando o `pip`, o gerenciador de pacotes do Python:

```
pip install -r requirements.txt
```

### 4\. Executar a Aplicação

Agora, a aplicação está pronta para ser executada. Siga estes comandos:


## (macOS/Linux)

```
export FLASK\_APP=app.py
```

## (Windows)

```
set FLASK\_APP=app.py
```

## Inicia o servidor de desenvolvimento

```
flask run
```

O servidor estará rodando em [http://127.0.0.1:5000/](https://www.google.com/search?q=http://127.0.0.1:5000/).
</details>

---

<details>
<summary><h2>🇬🇧 English Version</h2></summary>

## 🚀 About

This is a security and resource management system for a fictional company, Wayne Industries. The project was developed with a robust and scalable architecture, using a separated front-end and back-end to ensure data security and a dynamic user experience.

### Key Features:

- **Login and Authentication System:** Allows users with different roles (admin, manager, employee) to access restricted areas of the system.
- **Access Control:** An exclusive interface for administrators to manage users, with features for viewing, adding, editing, and deleting data.
- **Resource Management:** An interface to manage equipment inventory, with interactive cards, a search bar, and a dynamic filter modal by category.

## 💻 Technologies

The project was built with the following stack:

- **Front-end:**
  - **HTML5:** For page structure.
  - **CSS3:** For styling and responsiveness.
  - **JavaScript (ES6+):** For interaction logic, asynchronous requests (`fetch`), and dynamic DOM manipulation.
- **Back-end (API):**
  - **Python:** The main programming language.
  - **Flask:** A Python micro-framework used to create the RESTful API.
  - **Flask-SQLAlchemy:** A Flask extension that simplifies interaction with the database.
  - **SQLite:** A lightweight and portable database, used to permanently store data in a single file (`database.db`).

## ⚙️ Installation and Setup

Follow the steps below to clone the repository, install dependencies, and run the application.

### Prerequisites

- Python 3.8+
- Git

### 1\. Clone the Repository

Open your terminal and execute the following commands:

```
git clone https://github.com/Vampxyz/WayneIndustries.git
cd WayneIndustries
```

### 2\. Create and Activate the Virtual Environment

To isolate project dependencies, create and activate a virtual environment:

## Create the virtual environment

```
python -m venv venv
```

## Activate the virtual environment (Windows)

```
venv\\Scripts\\activate
venv/Scripts/activate
```

## Activate the virtual environment (macOS/Linux)

```
source venv/bin/activate
```

### 3\. Install Dependencies

Now, you will install all the necessary libraries using `pip`, Python's package manager:

```
pip install -r requirements.txt
```

### 4\. Run the Application

The application is now ready to be run. Follow these commands:

## (macOS/Linux)

```
export FLASK\_APP=app.py
```

## (Windows)

```
set FLASK\_APP=app.py
```

## Start the development server

```
flask run
```

The server will be running at [http://127.0.0.1:5000/](https://www.google.com/search?q=http://127.0.0.1:5000/).

</details>

## 📜 License

[MIT License](https://www.google.com/search?q=LICENSE) © Ryhan Nalbert
