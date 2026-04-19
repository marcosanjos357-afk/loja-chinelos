const app = document.getElementById("app");

// PRODUTOS
const produtos = [
    {
        nome: "Chinelo Básico",
        preco: 29.90,
        img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
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
    secao.classname = "produtos";

    produtos.forEach((produto, i) => {
        const card = document.createElement("div");
        card.classname = "produto";
    
        card.innerHTML = `
            img src="${produto.img}">
            div class="info">
                h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionar(${i})">
                    🛒 Comprar
                </button>
            </div>
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

function remover(index) {
    carrinho.splice(index, 1);
    salvar();
    atualizarCarrinho();
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

    carrinho.forEach((item, index) => {
    html += `
        <p>
            ${item.nome} 
            <button onclick="remover(${index})">❌</button>
        </p>
    `;
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