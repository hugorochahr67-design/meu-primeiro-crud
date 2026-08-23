const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'tarefas.json');

function lerTarefas() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const dados = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(dados);
}

function salvarTarefas(tarefas) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tarefas, null, 2));
}

app.get('/api/tarefas', (req, res) => {
    res.json(lerTarefas());
});

app.post('/tarefas', (req, res) => {
    const { titulo } = req.body;
    if (!titulo) return res.redirect('/');

    const tarefas = lerTarefas();
    const novaTarefa = {
        id: Date.now().toString(),
        titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);
    res.redirect('/');
});

app.post('/tarefas/:id/toggle', (req, res) => {
    const { id } = req.params;
    const tarefas = lerTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas(tarefas);
    }
    res.redirect('/');
});

app.post('/tarefas/:id/deletar', (req, res) => {
    const { id } = req.params;
    let tarefas = lerTarefas();
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas(tarefas);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
