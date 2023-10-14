const final = document.querySelector('#final');
const simulado = JSON.parse(localStorage.getItem('Simulado'));
let acertos = 0;
let erros = 0;
let totalRespondido = 0;
const maxRes = 35;
const anuladas = 2;

if(!simulado){
    window.location.href = 'index.html';
}

for (let info in simulado){
    console.log(simulado[info]);
    if(simulado[info][0] == true){
        acertos++;
        totalRespondido++;
    } else {
        erros++;
        totalRespondido++;
    }
}

const cardContent = [
    {
        id:1,
        name:'acertos',
        icon:'fa-regular fa-circle-check',
        titulo:'Você acertou',
        quantidade:acertos,
        porcentagem:(acertos*100)/maxRes,
    },
    {
        id:2,
        name:'erros',
        icon:'fa-regular fa-circle-xmark',
        titulo:'Você errou',
        quantidade:erros,
        porcentagem:(erros*100)/maxRes,
    },
    {
        id:3,
        name:'total',
        icon:'fa-solid fa-graduation-cap',
        titulo:'Total respondido',
        quantidade:acertos + erros,
        porcentagem:((acertos+erros)*100)/maxRes,
    },
];

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

mostrarRes();