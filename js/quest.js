import { gaba } from "./gaba.js"; //Importação da contante 'gaba' que contem uma ninhagem de arrays com as informações das questões.
import { timer } from "./timer.js"; //importação da função timer() para contabilização do tempo máximo no cronometro.

let indiceAtual = 0; //variavel para definição de indice da página, definida inicialmente como 0 para inicio da prova
const change = document.querySelector('#change'); //constante que referencia tag HTML com o ID 'change' para atribuição de conteudo via innerHTML.
const bgPop = document.querySelector('#bgPop'); //constante que referencia tag HTML com o ID 'bgPop' para atribuição de conteudo via innerHTML.
const popUp = document.querySelector('#popUp'); //constante que referencia tag HTML com o ID 'popUp' para atribuição de conteudo via innerHTML.
const showPopUp = document.querySelector('#showPopUp'); //constante que referenciatag HTML com o ID 'showPopUp' para atribuição de contudo via innerHTML.

//Função executada passando o centeudo dentro da contante 'change' atrávez do innerHTML usando o indice como parametro para escolha do conteudo.
export default function showQuest(indice) {
    const quest = gaba[indice]; //constante que referencia a função 'gaba' e seu indice.

    let radios = document.querySelectorAll('input[type="radio"]');

    if (quest.opcaoCorreta == "#") { //Verificando se a questão foi anulada
        alert("Questão Anulada");

        // Fazendo loop em todos os elementos radio e os desativando.
        radios.forEach(function (radio) {
            radio.disabled = true;
        });
    } else {
        radios.forEach(function (radio) {
            radio.disabled = false;
        });

    }
    
    const verifiPass = JSON.parse(localStorage.getItem('Simulado')) || {}; //constante para consulta ao localStorage, verificando se a questão já havia sido respondida.

    //Troca/Inserção de conteudo dentro da tag referenciada na constante 'change' atravéz de innerHTML.
    // Nota: Todo e qualquer conteudo dentro da seguinte sintax:"${...}" é o conteudo buscado no array gaba com o indice indicano na função ou criação de uma nova função.
    change.innerHTML = `
    <article class="questContainer">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1>
            <h3>Questão ${quest.id} / ${gaba.length}</h3>
            <div class="img-cont">
                <img src="${quest.img}" alt="Imagem da Questão">
            </div>
            <p><b>${quest.enunciado}</b></p>

            
            <div class="alterContainer">
            ${quest.opcoes.map(opcao => {
        return `
                <input type="radio" name="${quest.id}" id="${quest.id}_${opcao.id}" value="${opcao.id}"/>
                <label for="${quest.id}_${opcao.id}"><span class="alterId">${opcao.id})</span> ${opcao.texto}</label><br><br>
                `;
                //Atravéz do innerHTML podemos criar um elemento HTML para cada valor encontrado no array gaba.
    }).join('')}
            </div>
    <form id="form" action="#">
        <div class="btns">
            <button type="button" id="volt">Voltar</button>
            <button type="button" id="prox">Próxima</button>
            <button type="submit" id="verif">Corrigir</button>
            <button type="button" id="estatic">Estastísticas</button>
            <button type="button" id="resetar">Refazer Prova</button>
            <button type="button" id="final">Finalizar</button>
            <button type="button" id="sair">Sair</button>
        </div>
    </form>
    <p>Fonte: <a href="https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado_ciencia_computacao.pdf" target="_blank">https://download.inep.gov.br/enade/provas_e_gabaritos/2021_PV_bacharelado/ciencia_computacao.pdf</a></p>
    <ul id="navBar" class="navBar"></ul>
    </article>
    `;

    //Função que verifica qual alternativa foi clicada pelo usuario e manda as informações: "Indice da questão"(ex: 1, 2, 3, ...), "Acerto da questão"(ex: true ou false) e "Indice da alternativa"(ex: A, B, C, D ou E).
    quest.opcoes.forEach(opcao => {
        const input = document.getElementById(`${quest.id}_${opcao.id}`);
        input.addEventListener('change', () => {
            if (input.checked) {
                armazQuest(
                    quest.id,
                    input.value == quest.opcaoCorreta,
                    input.value
                )
            }
        })
        if (verifiPass[quest.id]) {
            input.disabled = true;
            if (verifiPass[quest.id][1] == opcao.id) {
                input.checked = true;
            }
        }
    })

    //Atribuição de evento ao clique do usuario ao botão 'verificar', sendo envio das informações para o popup de resposta.
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault(); //função para prevenir a ação padrão do formulário
        const select = document.querySelector(`input[name="${quest.id}"]:checked`); //constante que referencia a alternativa selecionada.
        //verifica o valor da constante select para atribuição de função.
        if (select.value != null) {
            //caso select for preenchida executa a função openPop.
            openPop(quest, select.value == quest.opcaoCorreta, select.value);
        }else{
            //Caso contrário exibir alerta ao usuario de que nenhuma alternativa foi selecionada.
            window.alert('Nenhuma alternativa selecionada!');
        };

        const opcoesHTML = document.querySelectorAll('input[type="radio"]'); //Constante que referencia todas as alternativas presentes na tela.

        opcoesHTML.forEach(opcao => {
            //desativa todas as alternativas para o usuario não trocar a resposta.
            opcao.disabled = true;
        });

        if (select.value) {
            //se select estiver preenchida manda informações para função armazQuest.
            armazQuest(
                quest.id,
                select.value == quest.opcaoCorreta,
                select.value
            )
            openPop(quest, select.value == quest.opcaoCorreta, select.value);
        };
    });

    document.querySelector('#estatic').addEventListener('click', () => {
        //e.preventDefault(); //função para prevenir a ação padrão do formulário
        const select = document.querySelector(`input[name="${quest.id}"]:checked`); //constante que busca a alternativa selecionada
        //verifica o valor da constante select para atribuição de função
        if (select.value != null) {
            //caso select for preenchida executa a função openPop
            openPop(quest, select.value == quest.opcaoCorreta, select.value, "estatic");
        };

        const opcoesHTML = document.querySelectorAll('input[type="radio"]'); //seleciona todas as alternativas para desativalas

        opcoesHTML.forEach(opcao => {
            //desativa todas as alternativas para o usuario não trocar a resposta
            opcao.disabled = true;
        });

        if (select.value) {
            //se select estiver preenchida manda informações para função armazQuest
            armazQuest(
                quest.id,
                select.value == quest.opcaoCorreta,
                select.value
            )
            openPop(quest, select.value == quest.opcaoCorreta, select.value, "estatic");
        };
    });

    //Atribuição de evento ao clique do usuario no botão 'Voltar', sendo execução da função responsavel pelo indice.
    document.querySelector('#volt').addEventListener('click', () => {
        altQuest(false); //executa a função altQuest com valor false.
    });

    //Atribuição de eventro ao clique do usuario no botão 'Proximo', sendo execução da função responsavel pelo indice.
    document.querySelector('#prox').addEventListener('click', () => {
        altQuest(true); //executa a função altQuest com valor true.
    });

    //Atribuição de evento ao clique do usuario no botão 'Finalizar'.
    document.querySelector('#final').addEventListener('click', () => {
        //Exibição de janela de confirmação do usuario se realmente deseja finalizar a prova.
        if (window.confirm('Deseja finalizar a prova?')) {
            //Caso o usuario confirme a ação: relocaliza o usuario para página 'final.html'
            location.assign('final.html')
        } else {
            //Caso contrário fecha janela de confirmção e nada acontece.
            return false;
        }
    });

    for (let i = 1; i < gaba.length + 1; i++) {
        const li = document.createElement("li");
        li.id = i;
        const navBar = document.querySelector('#navBar')
        li.textContent = i
        navBar.appendChild(li)
        li.addEventListener('click', () => {
            showQuest(i - 1);
            indiceAtual = i - 1;
            scrollTo(top);
        })
    }

    //Atribuição de evento ao clique do usuario no botão 'Sair'.
    document.querySelector('#sair').addEventListener('click', ()=>{
        //Exibição de janela de confirmação do usuario se realmente deseja sair da prova.
        if (confirm('Deseja sair do simulado e voltar ao inicio?')){
            //Caso o usuario confirme a ação: relocaliza o usuario para a página 'Index.html'.
            location.assign('index.html');
        } else {
            //Caso contrário fecha janela de confirmação e nada acontece.
            return false;
        }
    });

    //Atribuição de evento ao clique do usuario no botão 'Refazer a prova'.
    document.querySelector('#resetar').addEventListener('click', ()=>{
        //Exibição de janela de confirmação do usuario se realmete deseja refazer a prova.
        if (confirm('Deseja resetar a prova?')){
            //Caso o usuario confirme a ação: limpa todas as informações guardadas no localStorage e relocaliza o usuario para pagina 'tutorial.html'.
            localStorage.clear()
            location.assign('tutorial.html')
        } else {
            //Caso contrário fecha a janela de confirmação e nada acontece.
            return false;
        }
    });
};

showQuest(0); //execução da função showQuest no indice 0

//função para alterar o indiceAtual da página de simulado.
function altQuest(direcao) {
    //se valor = true adiciona 1 a variavel indiceAtual
    if (direcao) {
        indiceAtual++;
        //se valor de indiceAtual ultrapassar extenssão do gaba.js exibe alerta de confirmação para finaliza a prova
        if (indiceAtual > gaba.length - 1) {
            if (confirm('Deseja finalizar a prova?')) {
                //Caso o usuario confirme a ação: relocaliza o usuario para pagina 'final.html'.
                location.assign('final.html');
            } else {
                //Caso contrario fecha janela de confirmação e nada acontece.
                return false;
            }
        }
        //se valor = false retira 1 da variavel indiceAtual
    } else {
        indiceAtual--;
        //se indiceAtual for menor q 0 permanece com valor 0 no indice
        if (indiceAtual < gaba.length) {
            indiceAtual = indiceAtual;
        }
    }
    //executa a função showQuest com novo indiceAtual
    showQuest(indiceAtual);
    scrollTo(top);
}

//função para criação e armazenamento das respostas no localStorage
function armazQuest(questPosi, acertou, opcaoSelect) {
    const paraObjt = JSON.parse(localStorage.getItem('Simulado')) || {}; //criação do objeto "Simulado"
    paraObjt[questPosi] = [acertou, opcaoSelect]; //formatação do objeto
    const paraJson = JSON.stringify(paraObjt);  //contante para troca de objeto para JSON
    localStorage.setItem('Simulado', paraJson); //passar objeto para JSON para atribuição de valores
    console.log(localStorage);
};

function findKeyframesRule(sheet, name) {
    for (const rule of sheet.cssRules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === name) {
            return rule;
        }
    }
    return null;
}

function openPop(questao, acertou, altMarcada, buttonId = "verif") {
    showPopUp.classList.add('show'); //adiciona a classe "show" para o CSS
    const resPopUp = questao.opcoes.filter(e => e.id == questao.opcaoCorreta); //constante para filtro de acerto ou erro da resposta
    //variavel para buscar no array gaba o item de estatisticas (convertido para Int visto o "trailling zero" de questao.id)
    const estatBusca = gaba.find(item => parseInt(item.id, 10) === parseInt(questao.id, 10));
    //variável que faz a leitura dos campos contidos em 'estatisticas'
    const estatDados = estatBusca.estatisticas[0];
    //Abaixo a atribuição condicional de conteudo no popUp através de innerHTML
    //Caso o usuário esteja verificando a questão
    if (buttonId == "verif") {
        popUp.innerHTML = `
    <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
    <p class="fecharPopUp" id="fechar">Fechar</p>
      <div class="popUpContainer">
        <p class="popUpTitulo"> A resposta correta da Questão <span>${questao.id}:</span></p>
        <p class="popUpText"><span class="popUpTextId">${resPopUp[0].id}) </span>${resPopUp[0].texto}</p>
      </div>
    `;

        popUp.style.width = "580px";
        popUp.style.height = "250px";
    } else {
        //Caso o usuário queira conferir as estatísticas
        popUp.innerHTML = `
        <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> ${acertou ? 'Acertou!' : 'Errou!'}</h2>
        <p class="fecharPopUp" id="fechar">Fechar</p>
        <div class="popUpContents special">
            <h2 id="mediaAcertos">Media de acertos para essa questão:</h2>
            <h3 id="letraEscolhida">Opção assinalada: ${altMarcada})</h3>
            <h3 id="letraCorreta">Alternativa correta: ${resPopUp[0].id})</h3>
            <h4 id="desconsid" ${estatDados.porUF === '-%' ? '' : 'style="display: none;"'}><br>Estatística Indisponível para essa questão! <p id="ver-mais">(Ver mais...)</p></h4>
        </div>
        <div class="popUpContainer">
            <section class="bar-graph bar-graph-vertical bar-graph-two">
                <div class="bar-one bar-container">
                    <div class="bar" data-percentage="${estatDados.porUF}"></div>
                    <span class="uf">SP</span>
                </div>
                <div class="bar-two bar-container">
                    <div class="bar" data-percentage="${estatDados.porSudeste}"></div>
                    <span class="uf">Sudeste</span>
                </div>
                <div class="bar-three bar-container">
                    <div class="bar" data-percentage="${estatDados.porBrasil}"></div>
                    <span class="uf">Brasil</span>
                </div>
            </section>
            </div>
        <p id="rodape">Fonte: <a id="rodapeLink" href='../doc/ciencias_computacao_estatisticas.pdf' target="_blank">Ciências da Computação (Bacharelado)</a></p>
            
        <style>
        @-webkit-keyframes show-bar-one-vertical {
            0% {
                height: 0;
            }
        
            100% {
                height: ${estatDados.porUF};
            }
        }
        
        @-webkit-keyframes show-bar-two-vertical {
            0% {
                height: 0;
            }
        
            100% {
                height: ${estatDados.porSudeste};
            }
        }
        
        @-webkit-keyframes show-bar-three-vertical {
            0% {
                height: 0;
            }
        
            100% {
                height: ${estatDados.porBrasil};
            }
        }
        
        @-webkit-keyframes fade-in-text {
            0% {
                opacity: 0;
            }
        
            100% {
                opacity: 1;
            }
        }
        </style>
        `;
        popUp.style.width = "580px";
        popUp.style.height = "620px";
    }
    //adiciona classe "show" para bgPop e adiciona evento de click para adicionar classe "hidden"
    bgPop.addEventListener('click', () => {
        showPopUp.classList.remove('show');
        showPopUp.classList.add('hidden');
    });

    document.querySelector('#fechar').addEventListener('click', () => {
        showPopUp.classList.remove('show');
        showPopUp.classList.add('hidden');
    })

    /* Aparentemente o querySelector não se dá muito bem com elementos escondidos, logo se adicionou evento dessa maneira */
    document.addEventListener('click', (e) => {
        if (event.target.id === 'ver-mais') {
            e.stopImmediatePropagation();
            alert("De acordo com a fonte da pesquisa para as Estatísticas, a presente questão foi 'Desconsiderada pelo Bisserial' no que tangem as porcentagens de acerto!");
        }
    });
};

const data = new Date(); //constante para uso do metodo Date()
const [horaIni, minIni, secIni] = [data.getHours(), data.getMinutes(), data.getSeconds()]; //atribuição de valores para hora de inicio do simulado
armazTemp(data.getDay(), horaIni, minIni, secIni); //execução da função armazTemp
//função que recebe parametros para guardar no localStorage
function armazTemp(date, horaIni, minIni, secIni) {
    const Objt = JSON.parse(localStorage.getItem('TempoIni')) || {}; //criação do objeto "Simulado"
    Objt[date] = [horaIni, minIni, secIni]; //formatação dos parametros para o localStorage
    const Json = JSON.stringify(Objt);  //contante para troca de objeto para JSON
    localStorage.setItem('TempoIni', Json); //passar objeto para JSON para atribuição de valores
};

timer(); //execução da função timer() do arquivo timer.js
