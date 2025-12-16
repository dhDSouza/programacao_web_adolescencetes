// Espera o carregamento completo do DOM (Document Object Model), ou seja, quando a estrutura HTML da página estiver completamente carregada
document.addEventListener("DOMContentLoaded", () => {

    // Carregando os elementos da página com base em seus IDs para interagir com eles
    const btn = document.getElementById("btnTema"); // Botão de troca de tema (escuro/claro)
    const body = document.body; // O corpo da página (para poder alterar o tema de cor)
    const formLogin = document.getElementById("formLogin"); // Formulário de login
    const formCadastro = document.getElementById("formCadastro"); // Formulário de cadastro
    const formAtualizar = document.getElementById("formAtualizar"); // Formulário de atualização de dados
    const formDeletar = document.getElementById("formDeletar"); // Formulário de exclusão de conta

    // -------------------- ALTERAÇÃO DE TEMA --------------------
    // Verifica se o usuário prefere um tema escuro (baseado nas configurações do sistema)
    const temaInicial = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Se o sistema preferir o tema escuro, aplica a classe 'dark', caso contrário, aplica 'light'
    body.classList.add(temaInicial ? 'dark' : 'light');

    // Adiciona um evento para o botão de troca de tema
    btn.addEventListener("click", () => {
        body.classList.toggle('light'); // Se estiver em tema claro, troca para escuro
        body.classList.toggle('dark');  // Se estiver em tema escuro, troca para claro
    });

    // -------------------- LOGIN --------------------
    // Verifica se o formulário de login existe na página (caso a página seja de login)
    if (formLogin) {
        // Quando o formulário de login for submetido
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o comportamento padrão do formulário (que é recarregar a página)

            // Pega o valor dos campos de email e senha preenchidos pelo usuário
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                // Faz uma requisição POST para o servidor (com os dados do usuário)
                const res = await fetch('http://localhost:3000/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha }) // Envia o email e a senha como um objeto JSON
                });

                const data = await res.json(); // Converte a resposta para JSON
                if (res.status === 200) {
                    // Se o login for bem-sucedido (código de status 200), armazena o e-mail do usuário no localStorage
                    localStorage.setItem("userEmail", email);
                    alert(`OK: ${data.mensagem}`); // Exibe a mensagem de sucesso
                    window.location.href = "../profile.html"; // Redireciona o usuário para a página de perfil
                } else {
                    alert(`ERROR: ${data.mensagem}`); // Caso contrário, exibe a mensagem de erro
                }
            } catch (error) {
                alert("Erro ao conectar com o servidor"); // Caso haja algum erro na requisição
                console.error(error); // Mostra o erro no console para depuração
            }
        });
    }

    // -------------------- CADASTRO --------------------
    // Verifica se o formulário de cadastro existe na página
    if (formCadastro) {
        // Quando o formulário de cadastro for submetido
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o comportamento padrão do formulário

            // Pega os valores dos campos de email e senha
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                // Faz uma requisição POST para cadastrar o novo usuário
                const res = await fetch('http://localhost:3000/cadastrar', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha }) // Envia o email e a senha como um objeto JSON
                });

                const data = await res.json(); // Converte a resposta para JSON
                if (res.status === 201) {
                    alert(`OK: ${data.mensagem}`); // Se o cadastro for bem-sucedido (código de status 201), exibe mensagem de sucesso
                    window.location.href = "../index.html"; // Redireciona para a página de login após o cadastro
                } else {
                    alert(`ERROR: ${data.mensagem}`); // Caso contrário, exibe a mensagem de erro
                }
            } catch (error) {
                alert("Erro ao conectar com o servidor"); // Caso haja algum erro na requisição
                console.error(error); // Mostra o erro no console para depuração
            }
        });
    }

    // -------------------- PERFIL (EXIBIR E ATUALIZAR DADOS) --------------------
    // Recupera o e-mail do usuário do localStorage (que foi armazenado no login)
    const userEmail = localStorage.getItem("userEmail");
    const emailDisplay = document.getElementById("emailDisplay"); // Elemento onde o e-mail será exibido na página de perfil
    const userEmailElement = document.getElementById("userEmail"); // Outro elemento para exibir o e-mail do usuário

    // Verifica se estamos na página de perfil
    if (document.location == "http://localhost:3000/profile.html") {
        if (userEmail) {
            // Se o usuário estiver logado (ou seja, tiver um e-mail armazenado no localStorage), exibe o e-mail
            emailDisplay.textContent = userEmail;
            userEmailElement.textContent = userEmail;
        } else {
            // Se não estiver logado, avisa o usuário e redireciona para a página de login
            alert("Você não está logado. Redirecionando para o login...");
            window.location.href = "./index.html"; // Redireciona para a página de login
        }
    }

    // -------------------- ATUALIZAÇÃO DE DADOS --------------------
    // Verifica se o formulário de atualização de dados existe na página
    if (formAtualizar) {
        // Quando o formulário de atualização for submetido
        formAtualizar.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o comportamento padrão do formulário

            // Pega os novos valores de e-mail e senha
            const novoEmail = document.getElementById("novoEmail").value;
            const novaSenha = document.getElementById("novaSenha").value;

            // Verifica se pelo menos um dos campos foi preenchido
            if (!novoEmail && !novaSenha) {
                alert("Por favor, informe ao menos uma nova senha ou um novo e-mail.");
                return; // Se não, exibe um alerta e não faz nada
            }

            try {
                // Faz uma requisição PUT para atualizar os dados do usuário no servidor
                const res = await fetch('http://localhost:3000/atualizar', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: userEmail, senha: novaSenha, novoEmail: novoEmail }) // Envia as novas informações
                });

                const data = await res.json(); // Converte a resposta para JSON
                if (res.status === 200) {
                    alert(`OK: ${data.mensagem}`); // Se a atualização for bem-sucedida, exibe a mensagem de sucesso
                    if (novoEmail) {
                        localStorage.setItem("userEmail", novoEmail); // Se o e-mail foi alterado, atualiza o e-mail no localStorage
                        window.location.reload(); // Recarrega a página para refletir o novo e-mail
                    }
                } else {
                    alert(`ERROR: ${data.mensagem}`); // Caso contrário, exibe a mensagem de erro
                }
            } catch (error) {
                alert("Erro ao conectar com o servidor"); // Caso haja algum erro na requisição
                console.error(error); // Mostra o erro no console para depuração
            }
        });
    }

    // -------------------- EXCLUSÃO DE CONTA --------------------
    // Verifica se o formulário de exclusão de conta existe na página
    if (formDeletar) {
        // Quando o formulário de exclusão for submetido
        formDeletar.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o comportamento padrão do formulário

            const emailDeletar = userEmail; // Pega o e-mail do usuário armazenado no localStorage
            if (!emailDeletar) {
                alert("E-mail inválido.");
                return; // Se não houver e-mail, exibe um alerta e não faz nada
            }

            try {
                // Faz uma requisição DELETE para excluir a conta do usuário no servidor
                const res = await fetch('http://localhost:3000/deletar', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: emailDeletar }) // Envia o e-mail do usuário a ser deletado
                });

                const data = await res.json(); // Converte a resposta para JSON
                if (res.status === 200) {
                    alert(`OK: ${data.mensagem}`); // Se a exclusão for bem-sucedida, exibe a mensagem de sucesso
                    localStorage.removeItem("userEmail"); // Remove o e-mail do localStorage
                    window.location.href = "./index.html"; // Redireciona para a página de login após exclusão
                } else {
                    alert(`ERROR: ${data.mensagem}`); // Caso contrário, exibe a mensagem de erro
                }
            } catch (error) {
                alert("Erro ao conectar com o servidor"); // Caso haja algum erro na requisição
                console.error(error); // Mostra o erro no console para depuração
            }
        });
    }
});