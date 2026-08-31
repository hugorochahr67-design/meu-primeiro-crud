require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CONEXÃO COM O MONGO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
    .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Criando a estrutura (Modelo) da tarefa no banco de dados
const TarefaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    concluida: { type: Boolean, default: false }
});
const Tarefa = mongoose.model('Tarefa', TarefaSchema);

// 1. READ (Buscar do Banco)
app.get('/api/tarefas', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
});

// 2. CREATE (Salvar no Banco)
app.post('/tarefas', async (req, res) => {
    const { titulo } = req.body;
    if (!titulo) return res.redirect('/');

    try {
        await Tarefa.create({ titulo });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

// 3. UPDATE (Atualizar no Banco)
app.post('/tarefas/:id/toggle', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await Tarefa.findById(id);
        if (tarefa) {
            tarefa.concluida = !tarefa.concluida;
            await tarefa.save();
        }
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

// 4. DELETE (Deletar do Banco)
app.post('/tarefas/:id/deletar', async (req, res) => {
    const { id } = req.params;
    try {
        await Tarefa.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
