import { gaba } from "./gaba.js"; //Importação do arquivo gaba.js

let indiceAtual = 0; //Declaração da variavel ultilizada para passar valor do indice
const content = document.querySelector('#bloco'); //Constante ultilizada para indenticicar setor em que a função atua
const popUp = document.querySelector('#popUp');
const bgPop = document.querySelector('#bgPop');
const showPopUp = document.querySelector('#showPopUp');


//incluido export para chamar na outra classe (Metodo gambiarrento).
//Função innerHTML para mudaça de corpo do HTML com indentificação por indicie
export function mostrarQuest(indice) {
    const questao = gaba[indice];

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

            <form id="form" class="alter" action="#">
                ${questao.opcoes
            .map(opcao => {
                return `
                        <div class="opcao">
                            <input class="questaoOpcoesOpcao" type="radio" id="${questao.id}_${opcao.id}" name="${questao.id}" value="${opcao.id}">
                            <label class="questaoOpcaoText" for="${questao.id}_${opcao.id}"><span class="alter_id">${opcao.id})</span> ${opcao.texto}</label> <br>
                        </div>
                    `;
            })
            .join('')}
                <button class="questBtn" type="button" id="voltQuest">Voltar</button>
                <button class="questBtn" type="submit" id="veriQuest">Verificar</button>
                <button class="questBtn" type="button" id="proxQuest">Proxima</button>
            </form>

            <p>Fonte:<a href="https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf" target="_blank">Prova PDF</a></p>
            
        </article>
    `;

    document.querySelector('#proxQuest').addEventListener('click', () =>{
        altQuest(true);
    });

    document.querySelector('#voltQuest').addEventListener('click', () =>{
        altQuest(false);
    });

    document.querySelector('#form').addEventListener('submit', e => {
       e.preventDefault();
       const selecionada = document.querySelector(`input[name="${questao.id}"]:checked`);
        if (selecionada.value) {
          openPopUp(questao, selecionada.value == questao.opcaoCorreta);
        };
    });
};

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

//PopUp
function openPopUp(questao, acertou){
    showPopUp.classList.add('show');
    const resPopUp = questao.opcoes.filter( e => e.id === questao.opcaoCorreta);
    
    popUp.innerHTML = `
    <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
      <div class="popUpContainer">
        <p class="popUpTitulo"> A resposta correta da Questão <span>${questao.id}:</span></p>
        <p class="popUpText"><span class="popUpTextId">${resPopUp[0].id}) </span>${resPopUp[0].texto}</p>
      </div>
    `;
};

bgPop.addEventListener('click', ()=>{
    showPopUp.classList.remove('show');
    showPopUp.classList.add('hidden');
    console.log(showPopUp.classList);
});