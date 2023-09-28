import { gaba } from "./gaba.js"; //Importação do arquivo gaba.js

let indiceAtual = 0; //Declaração da variavel ultilizada para passar valor do indice
const content = document.querySelector('#bloco'); //Constante ultilizada para indenticicar setor em que a função atua
const prox = document.querySelector('#prox'); //Constante ultilizada para indentificar botão de mudança de corpo
const ante = document.querySelector('#voltar'); //Constante ultilizada para indentificar botão de mudança de corpo

//Função de atribuição de ação ao clique do botão
prox.addEventListener('click', () => {
    altQuest(true);
});
//Função de atribuição de ação ao clique do botão
ante.addEventListener('click', () => {
    altQuest(false);
});

//incluido export para chamar na outra classe (Metodo gambiarrento).
//Função innerHTML para mudaça de corpo do HTML com indentificação por indicie
export function mostrarQuest(indice) {
    const questao = gaba[indice];
    console.log(questao.enunciado);

    content.innerHTML = `
    <img src="../img/logo_png.svg">
        <article class="container">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1> 
            <h3>Questão ${questao.id} / ${gaba.length}</h3>
            ${questao.img.map(img => {
        return `
                <img src="${img.imgScr}" alt="Imagem da Questão" >
                `
    })
            .join('')}
            <p><b>${questao.enunciado}</b></p>

            <div class="alter">
                ${questao.opcoes
            .map(opcao => {
                return `
                        <div class="opcao">
                            <input class="questao__opcoes__opcao" type="radio" id="${questao.id}_${opcao.id}" " name="${questao.id} value="${opcao.id}">
                            <label class="questao_opcoes__texto" for="${questao.id}_${opcao.id}"><span class="alter_id">${opcao.id})</span> ${opcao.texto}</label> <br>
                        </div>
                    `;
            })
            .join('')}
            </div>
        </article>
    `;
}

//Execução da função anterior
mostrarQuest(0);

//Função de navegação pelo indicie
function altQuest(direcao) {
    if (direcao) {
        indiceAtual++;
        if (indiceAtual > gaba.length - 1) {
            indiceAtual = 0;
        }
    } else {
        indiceAtual -= 1;
        if (indiceAtual < gaba.length) {
            indiceAtual = indiceAtual;
        }
    }
    console.log(indiceAtual);
    mostrarQuest(indiceAtual);
}

