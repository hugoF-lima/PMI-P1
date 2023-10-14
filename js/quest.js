import {gaba} from "./gaba.js";

let indiceAtual = 0;
const change = document.querySelector('#change');
const bgPop = document.querySelector('#bgPop');
const popUp = document.querySelector('#popUp');
const showPopUp = document.querySelector('#showPopUp');

export function showQuest(indice){
    const quest = gaba[indice];
    const verifiPass = JSON.parse(localStorage.getItem('Simulado')) || {};
    
    change.innerHTML = `
    <a href="https://enade.inep.gov.br/enade/#!/index" target="_blank" class="enadeQuest"><img src="../img/logo_png.svg" alt="Logo enade"></a>
        <article class="questContainer">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1>
            <h3>Questão ${quest.id} / ${gaba.length}</h3>
            <img src="${quest.img}" alt="Imagem da Questão">
            <p><b>${quest.enunciado}</b></p>

            <form class="alterContainer" id="form" action="#">
            ${quest.opcoes.map(opcao => {
                return `
                <input type="radio" name="${quest.id}" id="${quest.id}_${opcao.id}" value="${opcao.id}"
                required ${verifiPass[quest.id] ? 'disabled' : ''}${verifiPass[quest.id] ? verifiPass[quest.id][1] === opcao.id ? 'checked' : '' : ''}/>
                <label for="${quest.id}_${opcao.id}"><span class="alterId">${opcao.id})</span> ${opcao.texto}</label><br><br>
                `; 
            }).join('')}

                <div class="btns">
                    <button type="button" id="volt">Voltar</button>
                    <button type="submit" id="verif">Verificar</button>
                    <button type="button" id="prox">Proxima</button>
                    <button type="button" id="final">Finalizar</button>
                </div>
            </form>

            <p>Fonte: <a href="https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf" target="_blank">Prova PDF</a></p>
        </article>
    `;

    document.querySelector('#form').addEventListener('submit', e =>{
        e.preventDefault();
        const select = document.querySelector(`input[name="${quest.id}"]:checked`);
        if (select.value) {
            openPop(quest, select.value == quest.opcaoCorreta);
        };

        const opcoesHTML = document.querySelectorAll('input[type="radio"]');

        opcoesHTML.forEach(opcao => {
            opcao.disabled = true;
        });

        if(select.value){
            armazQuest(
                quest.id,
                select.value == quest.opcaoCorreta,
                select.value
            )
            openPop(quest, select.value == quest.opcaoCorreta);
        };
    });

    document.querySelector('#volt').addEventListener('click', ()=>{
        altQuest(false);
    })

    document.querySelector('#prox').addEventListener('click', ()=>{
        altQuest(true);
    });

    document.querySelector('#final').addEventListener('click', ()=>{
        window.alert('Prova finalizada!');
        location.assign('final.html');
    });
};

showQuest(0);

function altQuest(direcao){
    if(direcao){
        indiceAtual++;
        if(indiceAtual>gaba.length -1){
            window.alert('Prova finalizada!');
            location.assign('final.html');
        }
    } else {
        indiceAtual-=1;
        if(indiceAtual<gaba.length){
            indiceAtual = indiceAtual;
        }
    }
    showQuest(indiceAtual);
}

function armazQuest(questPosi, acertou, opcaoSelect){
    const paraObjt = JSON.parse(localStorage.getItem('Simulado')) || {};
    paraObjt[questPosi] = [acertou, opcaoSelect];
    const paraJson = JSON.stringify(paraObjt);
    localStorage.setItem('Simulado', paraJson);
    console.log(localStorage);
};

function openPop(questao, acertou){
    showPopUp.classList.add('show');
    const resPopUp = questao.opcoes.filter(e => e.id == questao.opcaoCorreta);

    popUp.innerHTML= `
    <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
      <div class="popUpContainer">
        <p class="popUpTitulo"> A resposta correta da Questão <span>${questao.id}:</span></p>
        <p class="popUpText"><span class="popUpTextId">${resPopUp[0].id}) </span>${resPopUp[0].texto}</p>
      </div>
    `;

    bgPop.addEventListener('click', () => {
        showPopUp.classList.remove('show');
        showPopUp.classList.add('hidden');
    });
};