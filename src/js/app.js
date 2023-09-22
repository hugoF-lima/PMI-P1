import { gaba } from "./gaba.js";

let indiceAtual = 0;
const content = document.querySelector('#bloco');
const prox = document.querySelector('#prox');
const ante = document.querySelector('#voltar');

prox.addEventListener('click', ()=>{
    altQuest(true);
});
ante.addEventListener('click', ()=>{
    altQuest(false);
});

function mostrarQuest(indice){
    const questao = gaba[indice];
    console.log(questao.enunciado);

    content.innerHTML = `
        <article class="container">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1> 
            <h3>Questão ${questao.id}</h3>
            ${questao.img.map(img =>{
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

mostrarQuest(0);

function altQuest(direcao){
    if(direcao){
        indiceAtual++;
        if(indiceAtual > gaba.length -1){
            indiceAtual = 0;
        }
    } else {
        indiceAtual -=1;
        if(indiceAtual < gaba.length){
            indiceAtual = indiceAtual;
        }
    }
    console.log(indiceAtual);
    mostrarQuest(indiceAtual);
}