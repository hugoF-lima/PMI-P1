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

console.log('Simulado: ',simulado);
console.log('Simulado[info]: ', simulado['02']);

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
        <div class="finalizado">
            <div class="finalizado__header">
                <h3>Simulado finalizado</h3>
                <p>Confira suas estatísticas: </p>
            </div>
            <div class="finalizado__conteudo">
                ${cardContent
                  .map(info => {
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
                        ? `/${maxRes}`
                        : ''
                    } Questões 
                                </p>
                            </div>
                            <div class="finalizado__conteudo__card__body__porcent">
                                <p>${info.porcentagem.toFixed(2)}%</p>
                            </div>
                        </div>
                        <div class="finalizado__conteudo__card__footer"></div>
                    </div>`;
                  })
                  .join('')}
            </div>
        </div>
    `;
}

mostrarRes();