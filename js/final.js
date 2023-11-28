import { gaba } from "./gaba.js"; //importação do array gaba.js

const final = document.querySelector('#final'); //constante para seleção da area com ID "final"
const simulado = JSON.parse(localStorage.getItem('Simulado')); //constante para leitura das respostas do simulado no localStorage
const tempoIni = JSON.parse(localStorage.getItem('TempoIni')); //constante para leitura do tempo de inicio do simulado no locaStorage
let acertos = 0; //variavel para contabilidade de acertos
let erros = 0; //variavel para contabilidade de erros
let total = 0; //variavel para contabilidade de total respondido
const maxRes = 35; //constante para máximo possivel de respostas
const anuladas = 2; //constante para questões anuladas
const data = new Date(); //constante para criação do metodo Date()
const [horaFin, minFin, secFin] = [data.getHours(), data.getMinutes(), data.getSeconds()]; //atribuição de valores para hora Finalizada do simulado
const [horaIni, minIni, secIni] = [tempoIni[data.getDay()][0], tempoIni[data.getDay()][1], tempoIni[data.getDay()][2]] //atribuição de valores para hora de inicio do simulado guardado no localStorage
const tempoTranscorrido = (horaFin - horaIni) + "h " + (minFin - minIni) + "m " + (secFin - secIni) + "s"; //Valor para tempo transcorrido do teste.

const change = document.querySelector('#change'); //constante para alteração de innerHTML atrávez de ID

//contabilização de acertos e erros
for (let info in simulado) {
    //se simulado info é verdadeiro ele soma mais para acertos e para o total
    if (simulado[info][0] == true) {
        acertos++;
        total++;
    } else {
        //caso contrário contabiliza mais para erros e para o total
        erros++;
        total++;
    }
}

//criação da array de acertos, erros e total
const cardContent = [
    {
        //informações de acerto
        id: 1,
        name: 'acertos',
        icon: 'fa-regular fa-circle-check',
        titulo: 'Você acertou',
        quantidade: acertos,
        porcentagem: (acertos * 100) / maxRes,
    },
    {
        //informações de erro
        id: 2,
        name: 'erros',
        icon: 'fa-regular fa-circle-xmark',
        titulo: 'Você errou',
        quantidade: erros,
        porcentagem: (erros * 100) / maxRes,
    },
    {
        //informações totais
        id: 3,
        name: 'total',
        icon: 'fa-solid fa-graduation-cap',
        titulo: 'Total respondido',
        quantidade: acertos + erros,
        porcentagem: ((acertos + erros) * 100) / maxRes,
    },
];

function updateProgress(elementId, ref_value) {
    const progressBar = document.getElementById(elementId);
    let percentage = 0;

    const interval = setInterval(() => {
        progressBar.textContent = percentage + "%";
        percentage++;

        if (percentage > ref_value) {
            clearInterval(interval);
        }
    }, 10); // Ajustar o intervalo o quanto necessário para a velocidade de animação
}

function mostrarEstatsAll() {
    let popUpsHTML = ''; // Initialize an empty string to accumulate HTML content

    change.innerHTML = `
    <article class="questContainer"></article>
    `;

    console.log(localStorage);

    for (var i = 0; i <= maxRes - 1; i++) {
        // Fazer essas variaveis obter a leitura do localStorage
        /* console.log("This", i, simulado[i.toString().padStart(2, '0')]); */

        let quest = gaba[i];
        console.log("questão atual", i, simulado[i.toString().padStart(2, '0')]?.[1]);
        let acertou = simulado[(i + 1).toString().padStart(2, '0')]?.[0] || false;
        /* O padrão de leitura abaixo é usado devido ao objeto ser lido como simulado["02"] por exemplo
        E caso o mesmo seja vazio, retorna '-' */
        let altMarcada = simulado[(i + 1).toString().padStart(2, '0')]?.[1] || '-';
        let resPopUp = quest.opcaoCorreta || '-';

        const estatBusca = gaba[i];

        //variável que faz a leitura dos campos contidos em 'estatisticas'
        const estatDados = estatBusca.estatisticas[0];
        const popUp = document.createElement('div');
        popUp.classList.add('resultados-estats');

        popUp.innerHTML = `
            <h2 class="popUpTitle ${acertou ? 'acertou' : 'errou'}"> Questão ${quest.id}:  ${acertou ? 'Acertou!' : 'Errou!'}</h2>
            
            <div class="popUpContents special">
                <h2 id="mediaAcertos">Media de acertos para essa questão:</h2>
                <h3 id="letraEscolhida">Opção assinalada: ${altMarcada})</h3>
                <h3 id="letraCorreta">Alternativa correta: ${resPopUp})</h3>
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
            
            <style>
            @-webkit-keyframes show-bar-one-vertical {
                0% {
                    height: 0;
                }
            
                100% {
                    height: ${estatDados.porUF === '-%' ? '0%' : estatDados.porUF};
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
            <p id="rodape">Fonte: <a id="rodapeLink" href='../doc/ciencias_computacao_estatisticas.pdf' target="_blank">Ciências da Computação (Bacharelado)</a></p>
            
            `;
        popUp.style.width = "580px";
        popUp.style.height = "620px";

        /* document.body.appendChild(popUp); */
        popUpsHTML += popUp.outerHTML;

    }

    document.querySelector('.questContainer').innerHTML = popUpsHTML;

    /* Aparentemente o querySelector não se dá muito bem com elementos escondidos, logo se adicionou evento dessa maneira */
    document.addEventListener('click', () => {
        if (event.target.id === 'ver-mais') {
            alert("De acordo com a fonte da pesquisa para as Estatísticas, a presente questão foi 'Desconsiderada pelo Bisserial' no que tangem as porcentagens de acerto!");
        }
    });
}

function limparLocalStorage() {
    const temaValue = localStorage.getItem("Tema");
    console.log("Restaurado");
    localStorage.clear();

    // Preserve the "Tema" entry
    localStorage.setItem("Tema", temaValue);
}

/* Nessa função pego o breve insight de que é possível adicionar novos elementos a algo não existente 
a exemplo do TODO: "Questão anulada"*/
function mostrarRes() {
    const objetoAcertos = cardContent[0];
    const objetoErros = cardContent[1];
    const objetoTotal = cardContent[2];
    //convertendo objetos para "inteiro"
    const acertosFinais = +objetoAcertos.porcentagem.toFixed(0);
    const errosFinais = +objetoErros.porcentagem.toFixed(0);
    final.innerHTML = `
        <div class="container">
            <div class="content">
                <div>
                    <h2 class="resultado">Teste Finalizado!</h2>
                </div>
                <div>
                    <div class="image">
                        <img src="">
                    </div>
                    <div class="bar" style="--clr1: #2461C8; --clr2: #0d0080;">
                        <span class="progress" id="${acertosFinais}"></span>
                        <h1 id="acertos"></h1>
                        </div>
                        <h2>Acertos</h2>
                </div>
                <div>
                    <div class="image">
                        <img src="">
                    </div>
                    <div class="bar" style="--clr1: #6d0700; --clr2: #ff0000;">
                        <span class="progress" id="${errosFinais}"></span>
                        <h1 id="erros"></h1>
                        </div>
                        <h2>Erros</h2>
                </div>
                <div>
                    <h3>Tempo Transcorrido: ${tempoTranscorrido} </h3>
                    <h3> Total Respondido: ${total}/${maxRes} <br> (${objetoTotal.porcentagem.toFixed(1)}%)</h3>
                </div>
                <div class="resultContainer">
                    <div class="btns">
                        <button type="button"><a href="./simulado.html" id="refazer">Refazer Simulado</a></button>
                        <button type="button" id="estats">Estatisticas</button>
                        <button type="button" id="sair">Sair</button>
                    </div>
                </div>
            </div>
            
        </div>
    `;

    /* Por algum motivo, essa const precisa estar posterior ao inner html para que as barras
    de progresso animem */
    const bars = document.querySelectorAll('.progress');
    /* bloco responsável pelo intervalo de animação do gráfico */
    bars.forEach(item => {
        let value = item.id;
        let contador = 0;
        let interval = setInterval(function () {
            item.style.width = contador + "%";
            if (contador == value) {
                clearInterval(interval);
            }
            contador++;
        }, 8);
    })

    updateProgress("acertos", acertosFinais);
    updateProgress("erros", errosFinais);

    document.querySelector('#sair').addEventListener('click', () => {
        if (confirm('Deseja voltar a tela inicial?')) {
            location.assign('index.html');
        } else {
            return false;
        }
    });

    document.querySelector('#estats').addEventListener('click', () => {
        //location.assign('estat.html');
        mostrarEstatsAll();
    });

    document.querySelector('#refazer').addEventListener('click', () => {
        if (confirm('Deseja voltar ao tutorial?')) {
            location.assign('tutorial.html');
        } else {
            location.assign('simulado.html');
        }
        limparLocalStorage();

    });
};

mostrarRes();
/* localStorage.clear(); */