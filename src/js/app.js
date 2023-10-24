import { gaba } from "./gaba.js"; //Importação do arquivo gaba.js

let indiceAtual = 0; //Declaração da variavel ultilizada para passar valor do indice
//tentando habilitar os botões de Index das questões
//const pageElement = document.querySelector("#navigationQuestion");

const content = document.querySelector('#bloco'); //Constante ultilizada para indenticicar setor em que a função atua
const popUp = document.querySelector('#popUp'); //Constante ultilizada para indentificar setor de popUp
const bgPop = document.querySelector('#bgPop'); //Constante ultilizada para indentificar o setor bgPop
const showPopUp = document.querySelector('#showPopUp'); //Constante ultilizada para indentificar o setor showPopUp
let qtd_Acertos = 2; //Váriavel usada temporariamente para contabilizar acertos
let qtd_Erros = 1; //Váriavel usada temporariamente para contabilizar erros

//Função geradora da navegação em botões
/* export function montarIndexQuest() {
    var pageElementAdd = "";
    for (var i = 0; i < gaba.length; i++) {
        pageElementAdd += "<button class='navButton' onclick='mostrarQuest(" + (i + 1) + ")'>" + (i + 1) + "</button>";
    }

    pageElementAdd.innerHTML = pageElementAdd;
} */

function saveSelectedOption(questaoId, selectedOptionId) {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    selectedOptions[questaoId] = selectedOptionId;
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
}

//Função innerHTML para mudaça de corpo do HTML com indentificação por indicie
export function mostrarQuest(indice) {
    //constante usada para puxar informações do arquivo gaba.js
    const questao = gaba[indice];

    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    const savedOptionId = selectedOptions[questao.id];

    /* Contagem do numero de questões para geração do conjunto de botões */
    var pageElementAdd = "";
    for (var i = 0; i < gaba.length; i++) {
        pageElementAdd += `<button type='button' class='navButton' onclick='mostrarQuest(${i + 1})'>${i + 1}</button>`;
    }

    //troca do conteudo HTML ultilizando innerHTML
    content.innerHTML = `
    <link rel="stylesheet" href="../css/body.css">
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
                <div class="containerBtns" id="contBtns">
                    <div class="btns">
                        <button type="button" class="dif" id="voltQuest">Anterior</button>
                        <button type="submit" id="veriQuest">Verificar</button>
                        <button type="button" id="proxQuest">Próxima</button>
                        <button type="button" id="finalizarQuest">Finalizar</button>
                    </div>
                    <div id="navigationQuestion" class="questioNavegation">${pageElementAdd}</div>
                </div>

            </form>

            <p>Fonte:<a href="https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf" target="_blank">Arquivo PDF da Prova</a></p>
            
        </article>
    `;

    questao.opcoes.forEach(opcao => {
        const radioInput = document.getElementById(`${questao.id}_${opcao.id}`);
        console.log("Radio input here" + questao.opcoes)
        // Add an event listener to capture the selected option
        radioInput.addEventListener('change', function () {
            if (this.checked) {
                saveSelectedOption(questao.id, opcao.id);
                console.log("Aiai" + questao.id);
            }
        });

        // Pre-select the saved option, if it exists
        if (savedOptionId === opcao.id) {
            radioInput.checked = true;
        }
    });

    //Atruibuição de função para o botão Finalizar passado no innerHTML
    document.querySelector('#finalizarQuest').addEventListener('click', () => {
        window.alert('Simulado finalizado.');
        localStorage.removeItem('selectedOptions');
        location.assign('finalizar.html');
    })

    //Atrubuição de função para o botão próximo passado no innerHTML
    document.querySelector('#proxQuest').addEventListener('click', () => {
        altQuest(true);
    });

    //Atrubuição de função para o botão voltar passado no innerHTML
    document.querySelector('#voltQuest').addEventListener('click', () => {
        altQuest(false);
    });

    //Atrubuição de função para o botão verificar passado no innerHTML
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault();
        const selecionada = document.querySelector(`input[name="${questao.id}"]:checked`);
        if (selecionada.value) {
            openPopUp(questao, selecionada.value == questao.opcaoCorreta);
        };
    });

    console.log(selectedOptions);
};

//Execução da função anterior
//Função agora é chamada via import pela script tag.
//Assim não conflita com a pg de mostrarResultado.
/* mostrarQuest(0); */

//Função de navegação pelo indicie
function altQuest(direcao) {

    if (direcao) {
        indiceAtual++;
        if (indiceAtual > gaba.length - 1) {
            window.alert('Simulado finalizado.');//caso o usuário chege ao final do simulado automáticamente passado para a tela de finalizar
            location.assign('finalizar.html');
        }
    } else {
        indiceAtual -= 1;
        if (indiceAtual < gaba.length) {
            indiceAtual = indiceAtual;
        }
    }
    mostrarQuest(indiceAtual);//executar função de troca de innerHTML com o novo indice
}

//função criada para mostrar quantidades de acertos e erros do usuario
export function mostrarResultados() {
    let porcentagemAcertos = (qtd_Acertos * 100) / gaba.length;
    let porcentagemErros = (qtd_Erros * 100) / gaba.length;

    content.innerHTML = `
    <img src="../img/logo_png.svg">

        <article class="container">
        <h3>Simulado Finalizado!</h3>
        <h2 id="qtdAcerto">Quantidade de Acertos: ${qtd_Acertos} / ${gaba.length} (${Math.round(porcentagemAcertos)}%)</h2>
        <h2 id="qtdErros">Quantidade de Erros: ${qtd_Erros} / ${gaba.length} (${Math.round(porcentagemErros)}%)</h2>
        <h2 id="qtdRespond">Questões Respondidas: ${qtd_Acertos}/ ${gaba.length} (${Math.round(porcentagemAcertos)}%)</h2>
        <button id="iniciarSimulado"><a href="./simulado.html">Refazer Simulado!</button>   
        </article>
    `;
};

//função de execução do popUp
function openPopUp(questao, acertou) {
    showPopUp.classList.add('show');
    const resPopUp = questao.opcoes.filter(e => e.id === questao.opcaoCorreta);
    popUp.innerHTML = `
    <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
      <div class="popUpContainer">
        <p class="popUpTitulo"> A resposta correta da Questão <span>${questao.id}:</span></p>
        <p class="popUpText"><span class="popUpTextId">${resPopUp[0].id}) </span>${resPopUp[0].texto}</p>
      </div>
    `;

    //função para desabilitar popUp caso clique fora do mesmo
    bgPop.addEventListener('click', () => {
        showPopUp.classList.remove('show');
        showPopUp.classList.add('hidden');
        console.log(showPopUp.classList);
    });
};