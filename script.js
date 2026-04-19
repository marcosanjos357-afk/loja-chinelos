const app = document.getElementById("app");

// PRODUTOS
const produtos = [
    {
        nome: "Chinelo Básico",
        preco: 29.90,
        img: "https://via.placeholder.com/200"
    },
    {
        nome: "Chinelo Estiloso",
        preco: 39.90,
        img: "https://via.placeholder.com/200"
    },
    {
        nome: "Chinelo Premium",
        preco: 59.90,
        img: "https://via.placeholder.com/200"
    }
];

// CARRINHO
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// INICIAR
function iniciar() {
    criarHeader();
    criarProdutos();
    criarCarrinho();
    atualizarCarrinho();
}

// HEADER
function criarHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <h1>Chinelos Top</h1>
        <p>Os melhores chinelos 🔥</p>
    `;
    app.appendChild(header);
}

// PRODUTOS
function criarProdutos() {
    const secao = document.createElement("div");
    secao.className = "produtos";

    produtos.forEach((produto, i) => {
        const card = document.createElement("div");
        card.className = "produto";

        card.innerHTML = `
            <img src="${produto.img}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionar(${i})">Comprar</button>
        `;

        secao.appendChild(card);
    });

    app.appendChild(secao);
}

// ADICIONAR
function adicionar(i) {
    carrinho.push(produtos[i]);
    salvar();
    atualizarCarrinho();
}

// SALVAR
function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// CARRINHO
function criarCarrinho() {
    const div = document.createElement("div");
    div.className = "carrinho";
    div.id = "carrinho";
    document.body.appendChild(div);
}

// ATUALIZAR
function atualizarCarrinho() {
    const div = document.getElementById("carrinho");

    if (carrinho.length === 0) {
        div.innerHTML = "<h4>Carrinho</h4><p>Vazio</p>";
        return;
    }

    let total = 0;
    let html = "<h4>Carrinho</h4>";
    let texto = "Pedido:%0A";

    carrinho.forEach(item => {
        html += `<p>${item.nome}</p>`;
        texto += `- ${item.nome}%0A`;
        total += item.preco;
    });

    html += `<strong>Total: R$ ${total.toFixed(2)}</strong><br><br>`;
    texto += `Total: R$ ${total.toFixed(2)}`;

    html += `
        <a href="https://wa.me/SEUNUMERO?text=${texto}" target="_blank">
            <button>Finalizar no WhatsApp</button>
        </a>
    `;

    div.innerHTML = html;
}

// START
iniciar();