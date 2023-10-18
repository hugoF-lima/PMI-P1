const final = document.querySelector('#final'); //constante para seleção da area com ID "final"
const simulado = JSON.parse(localStorage.getItem('Simulado')); //constante para leitura do localStorage
let acertos = 0; //variavel para contabilidade de acertos
let erros = 0; //variavel para contabilidade de erros
let total = 0; //variavel para contabilidade de total respondido
const maxRes = 35; //constante para máximo possivel de respostas
const anuladas = 2; //constante para questões anuladas

//verifica se o localStorage está vazio
if(!simulado){
    //caso o localStorage esteja vazio o usuário volta a tela inicial
    window.location.href = 'index.html';
}

//contabilização de acertos e erros
for (let info in simulado){
    //se simulado info é verdadeiro ele soma mais para acertos e para o total
    if(simulado[info][0] == true){
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
        id:1,
        name:'acertos',
        icon:'fa-regular fa-circle-check',
        titulo:'Você acertou',
        quantidade:acertos,
        porcentagem:(acertos*100)/maxRes,
    },
    {
        //informações de erro
        id:2,
        name:'erros',
        icon:'fa-regular fa-circle-xmark',
        titulo:'Você errou',
        quantidade:erros,
        porcentagem:(erros*100)/maxRes,
    },
    {
        //informações totais
        id:3,
        name:'total',
        icon:'fa-solid fa-graduation-cap',
        titulo:'Total respondido',
        quantidade:acertos + erros,
        porcentagem:((acertos+erros)*100)/maxRes,
    },
];

//função para passar o conteudo da página por meio de innerHTML
function mostrarRes(){
    final.innerHTML = `
        <div class="final">
            ${cardContent.map(info =>{
                return`
                <h3 class="infoTitulo">${info.titulo}</h3>
                <p class="infoQuant">${info.quantidade} de ${maxRes}</p>
                <p class="infoPor">${info.porcentagem.toFixed(2)}%</p>
                `
            }).join('')}
        </div>
    `;
}

//execução da função mostrarRes
mostrarRes();