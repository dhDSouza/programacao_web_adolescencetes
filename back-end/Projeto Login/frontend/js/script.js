// Medida de segurança para carregar o JS apenas depois do HTML
document.addEventListener("DOMContentLoaded", () => {

    // Carregando Elementos do DOM
    const btn = document.getElementById("btnTema");
    const body = document.body;
    const form = document.getElementById("formLogin");

    // Adicionando uma classe inicial para o body, com base na preferência do sistema
    // Mesmo princípio do @media (prefers-color-scheme: dark) no CSS.
    const temaInicial = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.add(temaInicial ? 'dark' : 'light');

    // Alterando a classe pelo click no botão
    btn.addEventListener("click", () => {
        body.classList.toggle('light');
        body.classList.toggle('dark');
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {

            const res = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await res.json();

            if (res.status === 200) {
                alert(`OK: ${data.mensagem}`);
            } else {
                alert(`ERROR: ${data.mensagem}`);
            }

        } catch (error) {
            alert("Erro ao conectar com o servidor");
            console.error(eroor);
        }

    });

});
