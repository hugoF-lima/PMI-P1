import { gaba } from "./gaba.js";

const content = document.querySelector('#bloco');
const simulado = JSON.parse(localStorage.getItem('Simulado'));
let acertos = 0;
let erros = 0;
let totalRes = 0;
const maxQuest = gaba.length;
const anuladas = 2;

if(!simulado){
    window.location.href = 'index.html';
};

for (info in simulado){
    console.log(simulado[info]);
    if(simulado[info][0] == true){
        acertos++;
        totalRes++;
    } else {
        erros++;
        totalRes++;
    }
}

const cardContent = [
    {
        id: 1,
        name: 'acertos',
        icon: 'fa-regular fa-circle-check',
        titulo: 'Você acertou',
        quantidade: acertos,
        porcentagem: (acertos*100)/maxQuest,
    },
    {
        id: 2,
        name: 'errou',
        icon: 'fa-regular fa-circle-xmark',
        titulo: 'Você errou',
        quantidade: erros,
        porcentagem: (erros*100)/maxQuest,
    },
    {
        id: 3,
        name: 'total',
        icon: 'fa-solid fa-graduation-cap',
        quantidade: acertos + erros,
        porcentagem: ((acertos + erros)*100)/maxQuest,
    },
];

//função criada para mostrar quantidades de acertos e erros do usuario
export function mostrarResultados() {
    
    content.innerHTML = `
    <img src="../img/logo_png.svg">

        <article class="container">
        <h3>Simulado Finalizado!</h3>
        ${cardContent.map(info =>{
            return `
            <div class="finalizado__conteudo__card">
            <div class="finalizado__conteudo__card__header">
                <span class="finalizado__conteudo__card__header__icon ${
                  info.name
                }">
                    <i class="${info.icon}"></i>
                </span>
            </div>
            <div class="finalizado__conteudo__card__body">
                <div class="finalizado__conteudo__card__body__info">
                    <p 
                    class="finalizado__conteudo__card__body__info__texto">
                    ${info.titulo}</p>
                    <p 
                    class="finalizado__conteudo__card__body__info__qnt">
                    ${info.quantidade}${
          info.titulo === 'Total respondido'
            ? `/${maxQuest}`
            : ''
        } Questões 
                    </p>
                </div>
                <div class="finalizado__conteudo__card__body__porcent">
                    <p>${info.porcentagem.toFixed(2)}%</p>
                </div>
            </div>
            <div class="finalizado__conteudo__card__footer"></div>
        </div>
            `;
        }).join('')
    };   
        </article>
    `;
};

mostrarResultados();