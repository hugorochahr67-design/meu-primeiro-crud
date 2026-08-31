# 📝 Gerenciador de Tarefas Avançado (Full-Stack CRUD)

Este é um projeto de uma aplicação completa de gerenciamento de tarefas desenvolvida para consolidar meus conhecimentos em desenvolvimento Full-Stack e manipulação de dados na nuvem.

O projeto aplica o conceito completo de **CRUD** (Create, Read, Update, Delete) utilizando rotas HTTP inteligentes e persistência de dados real.

---

### 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB Atlas (Nuvem) com Mongoose (ODM)
- **Frontend:** HTML5, CSS3 Customizado, JavaScript Assíncrono (Fetch API)
- **Controle de Versão:** Git e GitHub

---

### 🚀 Funcionalidades do Sistema

- **[Create]** Adicionar novas tarefas através de formulários dinâmicos.
- **[Read]** Listagem automática de todas as tarefas cadastradas direto do banco de dados na nuvem com atualização em tempo real.
- **[Update]** Alternar o status da tarefa (Pendente / Concluída) salvando o novo estado no banco.
- **[Delete]** Exclusão permanente de registros do sistema.
- **Segurança:** Uso de variáveis de ambiente com `dotenv` para proteção de credenciais críticas de acesso.

---

### 🏃 Como rodar este projeto localmente

1. Clone o repositório para sua máquina:
   ```bash
   git clone https://github.com
   ```
2. Instale todas as dependências necessárias:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do seu projeto seguindo o modelo:
   ```text
   MONGO_URI=sua_string_de_conexao_do_mongodb
   ```
4. Inicie o servidor:
   ```bash
   node server.js
   ```
5. Acesse no seu navegador: `http://localhost:3000`
