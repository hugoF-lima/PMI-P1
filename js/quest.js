import {gaba} from "./gaba.js"; //importação do array gaba.js

let indiceAtual = 0; //variável para definição de índice da página
const change = document.querySelector('#change'); //constante para alteração de innerHTML através de ID
const bgPop = document.querySelector('#bgPop'); //constante para aparição do PopUp background através de ID
const popUp = document.querySelector('#popUp'); //constante para aparição do PopUp através de ID
const showPopUp = document.querySelector('#showPopUp'); //constante para container do pop-up

//função para troca de conteudo da página direcionado pelo indiceAtual atrávez de innerHTML
export function showQuest(indice){
    const quest = gaba[indice]; //constante para chamar array gana.js
    const verifiPass = JSON.parse(localStorage.getItem('Simulado')) || {}; //constante para consulta ao localStorage para verificação se a pergunta já foi respondida
    
    //novo conteudo da página através de innerHTML
    change.innerHTML = `
    <article class="questContainer">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1>
            <h3>Questão ${quest.id} / ${gaba.length}</h3>
            <img src="${quest.img}" alt="Imagem da Questão">
            <p><b>${quest.enunciado}</b></p>

            
            <div class="alterContainer">
            ${quest.opcoes.map(opcao => {
                return `
                <input type="radio" name="${quest.id}" id="${quest.id}_${opcao.id}" value="${opcao.id}"/>
                <label for="${quest.id}_${opcao.id}"><span class="alterId">${opcao.id})</span> ${opcao.texto}</label><br><br>
                `; 
            }).join('')}
            </div>
    <form id="form" action="#">
        <div class="btns">
            <button type="button" id="volt">Voltar</button>
            <button type="submit" id="verif">corrigir</button>
            <button type="button" id="estatic">Estastisticas</button>
            <button type="button" id="prox">Proxima</button>
            <button type="button" id="final">Finalizar</button>
        </div>
    </form>
    <p>Fonte: <a href="https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf" target="_blank">https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf</a></p>
    <ul id="navBar" class="navBar"></ul>
    </article>
    `;

    quest.opcoes.forEach(opcao =>{
        const input = document.getElementById(`${quest.id}_${opcao.id}`);
        input.addEventListener('change', ()=>{
            if(input.checked){
                armazQuest(
                    quest.id,
                    input.value == quest.opcaoCorreta,
                    input.value
                )
            }
        })
        if(verifiPass[quest.id]){
            input.disabled = true;
            if(verifiPass[quest.id][1] == opcao.id){
                input.checked = true;
            }
        }
    })

    //atribuição de ação ao botão "Verificar" para envio do formulário
    document.querySelector('#form').addEventListener('submit', e =>{
        e.preventDefault(); //função para prevenir a ação padrão do formulário
        const select = document.querySelector(`input[name="${quest.id}"]:checked`); //constante que busca a alternativa selecionada
        //verifica o valor da constante select para atribuição de função
        if (select.value) {
            //caso select for preenchida executa a função openPop
            openPop(quest, select.value == quest.opcaoCorreta);
        };

        const opcoesHTML = document.querySelectorAll('input[type="radio"]'); //seleciona todas as alternativas para desativalas

        opcoesHTML.forEach(opcao => {
            //desativa todas as alternativas para o usuario não trocar a resposta
            opcao.disabled = true;
        });

        if(select.value){
            //se select estiver preenchida manda informações para função armazQuest
            armazQuest(
                quest.id,
                select.value == quest.opcaoCorreta,
                select.value
            )
            openPop(quest, select.value == quest.opcaoCorreta);
        };
    });

    //atribuição de ação para o botão "Voltar"
    document.querySelector('#volt').addEventListener('click', ()=>{
        altQuest(false); //executa a função altQuest com valor false
    });

    //atribuição de ação para o botão "próximo"
    document.querySelector('#prox').addEventListener('click', ()=>{
        altQuest(true); //executa a função altQuest com valor true
    });

    //atribuição de ação para o botão "finalizar"
    document.querySelector('#final').addEventListener('click', ()=>{
        if(window.confirm('Deseja finalizar a prova?')){
            location.assign('final.html')
        } else {
            return false;
        }
    });

    for(let i=1; i<gaba.length+1; i++){
        const li = document.createElement("li");
        li.id = i;
        const navBar = document.querySelector('#navBar')
        li.textContent = i
        navBar.appendChild(li)
        li.addEventListener('click', ()=>{
            showQuest(i-1);
            indiceAtual = i-1;
            scrollTo(top);
        })
    }
};

showQuest(0); //execução da função showQuest no indice 0

//função para alterar o indiceAtual da página de simulado
function altQuest(direcao){
    //se valor = true adiciona 1 a variavel indiceAtual
    if(direcao){
        indiceAtual++;
        //se valor de indiceAtual ultrapassar extenssão do gaba.js finaliza a prova automáticamente
        if(indiceAtual>gaba.length -1){
            if(confirm('Deseja finalizar a prova?')){
                location.assign('final.html');
            } else {
                return false;
            }
        }
        //se valor = false retira 1 da variável indiceAtual
    } else {
        indiceAtual--;
        //se indiceAtual for menor q 0 permanece com valor 0 no índice
        if(indiceAtual<gaba.length){
            indiceAtual = indiceAtual;
        }
    }
    //executa a função showQuest com novo indiceAtual
    showQuest(indiceAtual);
    scrollTo(top);
}

//função para criação e armazenamento das respostas no localStorage
function armazQuest(questPosi, acertou, opcaoSelect){
    const paraObjt = JSON.parse(localStorage.getItem('Simulado')) || {}; //criação do objeto "Simulado"
    paraObjt[questPosi] = [acertou, opcaoSelect]; //formatação do objeto
    const paraJson = JSON.stringify(paraObjt);  //contante para troca de objeto para JSON
    localStorage.setItem('Simulado', paraJson); //passar objeto para JSON para atribuição de valores
    console.log(localStorage);
};

//função para criação de popUp e seus valores
function openPop(questao, acertou){
    showPopUp.classList.add('show'); //adiciona a classe "show" para o CSS
    const resPopUp = questao.opcoes.filter(e => e.id == questao.opcaoCorreta); //constante para filtro de acerto ou erro da resposta

    //atribuição de conteudo no popUp através de innerHTML
    popUp.innerHTML= `
    <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
      <div class="popUpContainer">
        <p class="popUpTitulo"> A resposta correta da Questão <span>${questao.id}:</span></p>
        <p class="popUpText"><span class="popUpTextId">${resPopUp[0].id}) </span>${resPopUp[0].texto}</p>
      </div>
    `;

    //adiciona classe "show" para bgPop e adiciona evento de click para adicionar classe "hidden"
    bgPop.addEventListener('click', () => {
        showPopUp.classList.remove('show');
        showPopUp.classList.add('hidden');
    });
};