# Trabalho Final — Projeto Web 🎯

## 🧾 Tema do trabalho (escolham 1)

Cada grupo _(até 4 pessoas)_ ou aluno individual escolhe **um** dos projetos abaixo e desenvolve uma aplicação web responsiva, interativa e bem organizada:

* **Loja online pequena** — cadastro/edição de produtos, catálogo, carrinho simples.
* **App de receitas** — cadastro de receitas, busca, favoritos.
* **Gerenciador de eventos/agenda** — criar eventos, inscrição, calendário.
* **Portfólio + blog pessoal** — cadastro de posts, página do autor, formulário de contato.

> [!NOTE]
> Podem adaptar qualquer ideia — o importante é **ter um cadastro (formulário que grava algo)** e interações com JavaScript.

---

## 🛠 Requisitos obrigatórios (leia com atenção)

1. **HTML semântico**: usar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`, `<label>`, etc. Evitem `<div>` quando existir tag semântica adequada.

2. **CSS responsivo**: layout que funcione bem em celulares, tablets e desktops.

> [!TIP]
> Testem redimensionando a janela!

3. **CSS modular**: dividam o CSS em vários arquivos com responsabilidades claras (ex.: `base.css`, `layout.css`, `components.css`, `pages.css`, `theme.css`). **Criem um `main.css` que importe os outros arquivos** (ex.: usando `@import` no topo do `main.css` ou colocando referências organizadas.

4. **JavaScript para interações**:

   * Validação e submissão de formulário (pelo menos validação front-end).
   * Manipulação de clique (ex.: adicionam ao carrinho, alternam favoritos).
   * Atualização dinâmica do DOM sem recarregar a página (ex.: adicionar item na lista, atualização de contadores).

5. **Cadastro funcional**: pelo menos uma funcionalidade de “cadastro” (produto, usuário, tarefa, receita, evento etc.) que salve dados e permita ver/editar/excluir.

7. **Acessibilidade básica**: labels nos inputs, contraste legível.

8. **Código organizado e comentado**: HTML limpo, CSS dividido, JS com funções nomeadas e comentários quando necessário.

---

## 🎯 Critérios de avaliação

* Estrutura semântica e HTML limpo
* Responsividade e design adaptável
* CSS modular e organização de estilos
* Funcionalidade de cadastro + CRUD básico
* Interatividade com JavaScript (eventos, validação, DOM)
* Acessibilidade e usabilidade (labels, foco, contraste)
* Organização do projeto e apresentação final

> [!IMPORTANT]
> A falta de qualquer requisito obrigatório reduz bastante a nota.

---

## 📁 Estrutura de pastas sugerida

```
/projeto-meu
  /public
    /images
    /icons
  /css
    main.css          <-- importa os outros (ou referencia no HTML)
    base.css
    layout.css
    components.css
    pages.css
  /js
    app.js
    forms.js
    ui.js
  index.html
  produtos.html (opcional)
```

---

## ✍️ Entregáveis

* ZIP com o projeto.
* **Apresentação curta (2–5 min)**
    - Cada grupo mostra:
        1. Objetivo do projeto;
        2. Principais decisões técnicas;
        3. Demo das funcionalidades de cadastro e interações;

---

## ✅ Checklist (façam antes de entregar)

* [ ] Todas as páginas usam tags semânticas corretas.
* [ ] Layout funciona em celular e desktop (teste responsivo).
* [ ] CSS dividido em pelo menos 3 arquivos + `main.css` que importa os outros.
* [ ] Formulário com validação (campos obrigatórios, feedback de erro).
* [ ] Pelo menos um evento de click que altera o DOM.
* [ ] Funcionalidade de ver/editar/remover itens cadastrados.
* [ ] Código organizado e comentado.
* [ ] Apresentação pronta (demo funcionando).
