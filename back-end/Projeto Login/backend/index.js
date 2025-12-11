const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

// Garantir que minha API trabalha com JSON
app.use(express.json());

// Garantir que os dados do formulário serão recebido no backend
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post("/login", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios!" });
    }

    // Variáveis de verificação 
    // (APENAS PARA TESTE RÁPIDO, O CORRETO É VERIFICAR DO CADASTRO)
    const emailCerto = "teste@teste.com";
    const senhaCerta = "123";

    if (email !== emailCerto || senha !== senhaCerta) {
        return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    return res.status(200).json({ mensagem: "Logado com sucesso!" });

});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});