const final = document.querySelector('#final'); //constante para seleção da area com ID "final"
const simulado = JSON.parse(localStorage.getItem('Simulado')); //constante para leitura das respostas do simulado no localStorage
const tempoIni = JSON.parse(localStorage.getItem('TempoIni')); //constante para leitura do tempo de inicio do simulado no locaStorage
let acertos = 0; //variavel para contabilidade de acertos
let erros = 0; //variavel para contabilidade de erros
let total = 0; //variavel para contabilidade de total respondido
const maxRes = 35; //constante para máximo possivel de respostas
const anuladas = 2; //constante para questões anuladas
const data = new Date(); //constante para criação do metodo Date()
const [horaFin,minFin,secFin] = [data.getHours(),data.getMinutes(),data.getSeconds()]; //atribuição de valores para hora Finalizada do simulado
const [horaIni,minIni,secIni] = [tempoIni[data.getDay()][0],tempoIni[data.getDay()][1],tempoIni[data.getDay()][2]] //atribuição de valores para hora de inicio do simulado guardado no localStorage
const tempoTranscorrido = (horaFin-horaIni)+"h "+(minFin-minIni)+"m "+(secFin-secIni)+"s"; //Valor para tempo transcorrido do teste.

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
//função para passar o conteudo da página por meio de innerHTML
/* function mostrarRes() {
    final.innerHTML = `
        <div class="final">
            ${cardContent.map(info => {
        return `
                <h3 class="infoTitulo">${info.titulo}</h3>
                <p class="infoQuant">${info.quantidade} de ${maxRes}</p>
                <p class="infoPor">${info.porcentagem.toFixed(2)}%</p>
                `
    }).join('')}
        </div>
    `;
} */
function updateProgress(elementId, ref_value) {
    const progressBar = document.getElementById(elementId);
    let percentage = 0;

    const interval = setInterval(() => {
        progressBar.textContent = percentage + "%";
        percentage++;

        if (percentage > ref_value) {
            clearInterval(interval);
        }
    }, 10); // Adjust the interval duration as needed for the desired animation speed
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
            </div>
            <div>
                <button type="button" id="refazer">Refazer a prova</button>
                <button type="button" id="sair">Sair</button>
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

    document.querySelector('#sair').addEventListener('click', ()=>{
        if (confirm('Deseja voltar a tela inicial?')){
            location.assign('index.html');
        }else{
            return false;
        }
    });

    document.querySelector('#refazer').addEventListener('click', ()=>{
        if (confirm('Deseja voltar ao tutorial?')){
            location.assign('tutorial.html');
        }else{
            return false;
        }
    });
};

mostrarRes();
localStorage.clear();