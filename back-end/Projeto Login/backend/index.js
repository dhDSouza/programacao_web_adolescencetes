const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

// Garantir que minha API trabalha com JSON
app.use(express.json());

// Garantir que os dados do formulário serão recebido no backend
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

let users = [];

app.post("/login", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios!" });
    }

    // Procurar o usuário pelo e-mail
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ mensagem: "Usuário não encontrado!" });
    }

    // Verificar se a senha está correta
    if (user.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }

    return res.status(200).json({ mensagem: "Logado com sucesso!" });
});

app.post("/cadastrar", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios!" });
    }

    // Verificar se o usuário já existe
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(409).json({ mensagem: "E-mail já cadastrado!" });
    }

    // Adicionar o novo usuário
    users.push({ email, senha });

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});

// Endpoint para atualizar um usuário
app.put("/atualizar", (req, res) => {
    const email = req.body.email;
    const novaSenha = req.body.senha;
    const novoEmail = req.body.novoEmail;

    if (!email || (!novaSenha && !novoEmail)) {
        return res.status(400).json({ mensagem: "E-mail e ao menos um campo (nova senha ou novo e-mail) são obrigatórios!" });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ mensagem: "Usuário não encontrado!" });
    }

    // Atualizar e-mail ou senha
    if (novoEmail) user.email = novoEmail;
    if (novaSenha) user.senha = novaSenha;

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
});

// Endpoint para excluir um usuário
app.delete("/deletar", (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ mensagem: "E-mail é obrigatório para deletar o usuário!" });
    }

    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        return res.status(400).json({ mensagem: "Usuário não encontrado!" });
    }

    // Remover o usuário do array
    users.splice(userIndex, 1);

    return res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});