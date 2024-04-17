// Lista de categorias disponíveis
const BuscarPorCategoria = document.getElementById('BuscarPorCategoria')
const categoriasDisponiveis = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Esporte', 'Outros'];
// Função para preencher o <select> de categorias
function preencherCategorias() {
    const select = document.getElementById('categoria');
    categoriasDisponiveis.forEach(categoria => {
        const opcao = document.createElement('option');
        opcao.value = categoria;
        opcao.text = categoria;
        select.appendChild(opcao);
    });
}
// Evento para preencher as categorias quando a página carregar
document.addEventListener('DOMContentLoaded', preencherCategorias);
//Adicionar gastos
class AddGasto {
    constructor(categoria, item, descricao, valor) {
        this.categoria = categoria;
        this.item = item;
        this.descricao = descricao;
        this.valor = valor;
    }
}

// Lista de gastos simulada : Mutu
let listaDeGastos = [];
// Função para adicionar um novo gasto à lista
function adicionarGasto(categoria, item, descricao, valor) {
    const novoGasto = new AddGasto(categoria, item, descricao, valor);
    listaDeGastos.push(novoGasto);
}

// Função para pesquisar gastos por item
function pesquisarItem(item) {
    return listaDeGastos.filter(gasto => gasto.item.toLowerCase().includes(item.toLowerCase()));
}
function pesquisarEGerarLista() {
    const itemBuscado = document.getElementById('searchItem').value;
    const resultados = pesquisarItem(itemBuscado);
    mostrarListGastos({ [itemBuscado]: resultados });
}
// Função para remover um gasto da lista
function removerGasto(index) {
    if (confirm('Deseja excluir esse Item?')) {
        listaDeGastos.splice(index, 1);
        exibirGastos();
    }
}
// Função para editar um gasto da lista
function editarGasto(index) {
    const novoItem = prompt("Digite o novo item:");
    const novaDescricao = prompt("Digite a nova descrição:");
    const novoValor = parseFloat(prompt("Digite o novo valor:"));

    if (novoItem && novaDescricao && !isNaN(novoValor)) {
        listaDeGastos[index].item = novoItem;
        listaDeGastos[index].descricao = novaDescricao;
        listaDeGastos[index].valor = novoValor;
        exibirGastos();
    } else {
        alert('Edição Inválida! Preencha os valores corretamente');
    }
}
// Função para mostrar os gastos na lista
function mostrarListGastos(gastosPorItem) {
    // Captura o elemento onde os gastos serão listados
    const listaDiv = document.getElementById('listGastos');
    listaDiv.innerHTML = '';
    // Itera sobre os itens e gastos para criar a exibição na página
    for (const item in gastosPorItem) {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<h2>${item}</h2>`;     
        itemDiv.setAttribute('id', 'titulo-gasto')   
        
        gastosPorItem[item].forEach((gasto, index) => {
            const gastoDiv = document.createElement('div');
            gastoDiv.classList.add('gasto-item');

            gastoDiv.innerHTML = `
                <p>Categoria: ${gasto.categoria}</p>
                <p>Descrição: ${gasto.descricao}</p>
                <p>Valor: R$ ${gasto.valor.toFixed(2)}</p>
                <button class="btn-remover" onclick="removerGasto(${index})"><span class="material-symbols-outlined">
                delete
                </span></button>
                <button class="btn-editar" onclick="editarGasto(${index})"><span class="material-symbols-outlined">
                edit_square
                </span></button>
            `;
            itemDiv.appendChild(gastoDiv);
        });

        listaDiv.appendChild(itemDiv);
    }
}
// Função para adicionar um gasto a partir do formulário
function adicionarGastoForm() {
    const categoria = document.getElementById('categoria').value;
    const item = document.getElementById('item').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (categoria && item && descricao && !isNaN(valor)) {
        adicionarGasto(categoria, item, descricao, valor);
        exibirGastos();
        alert('Gasto Adicionado com sucesso!');
    } else {
        alert('Registro Inválido! Preencha os valores corretamente');
    }
}
//Funcao para buscar por categoria
buscarPorCategoria = (categoria) => {
   const gastosFiltrados = listaDeGastos.filter((el) => {
      return categoria.toLowerCase() === el.categoria.toLowerCase()
   })
   mostrarListGastos({ [categoria]: gastosFiltrados });
}

const searchItem = document.getElementById('searchItem');

BuscarPorCategoria.addEventListener('click',() => {
    buscarPorCategoria(searchItem.value)
})

function exibirGastos() {
    const gastosPorItem = {};

    listaDeGastos.forEach(gasto => {
        if (!gastosPorItem[gasto.item]) {
            gastosPorItem[gasto.item] = [];
        }
        gastosPorItem[gasto.item].push(gasto);
    });

    mostrarListGastos(gastosPorItem);
}

// Exibir os gastos na lista
exibirGastos();
