import { gaba } from "./gaba.js"; //importação do array gaba.js

const objtabla = document.querySelector('#gabarito-ancora'); //constante para seleção da area com ID "gabarito-ancora"
const simulado = JSON.parse(localStorage.getItem('Simulado')); //constante para leitura das respostas do simulado no localStorage

const maxRes = 35; //constante para máximo possivel de respostas

/* Na estrutura se criou um Array com length padrão de 35, visto que o objeto simulado nem sempre possuirá 35 elementos por padrão 
(Visto que o usuário pode deixar perguntas sem resposta). */
function mostrarGabUp() {
    // Create the container for both tables
    const container = document.createElement('div');
    container.classList.add('gabarito-container');

    // Gabarito do Candidato table
    const gabaritoCandidato = document.createElement('div');
    gabaritoCandidato.innerHTML = `
        <h3 class="t_titulo">Gabarito do Candidato</h3>
        <table class="tabela">
            <thead class="tabela__head">
                <tr>
                    <th id="questUsr"class="tabela__head__titulo"></th>
                    <th id="altUsr" class="tabela__head__titulo"></th>
                </tr>
            </thead>
            <tbody class="tabela__body">
                ${Array.from({ length: 35 }, (_, index) => {
        const questId = String(index + 1).padStart(2, '0'); // Assuming your quest IDs are formatted with leading zeros
        const selectedOption = simulado[questId] ? simulado[questId][1] : '-'; // Check if the quest exists in the simulado object
        return `
                        <tr>
                            <td class="tabela__body__texto">${questId}</td>
                            <td class="tabela__body__texto">${selectedOption}</td>
                        </tr>
                    `;
    }).join('')}
            </tbody>
        </table>
        <p id="rodapeG">Fonte: Os autores</p>
    `;

    // Gabarito do Enade table
    const gabaritoEnade = document.createElement('div');
    gabaritoEnade.innerHTML = `
        <h3 class="t_titulo">Gabarito do Enade</h3>
        <table class="tabela">
            <thead class="tabela__head">
                <tr>
                    <th id="altGab"class="tabela__head__titulo"></th>
                    <th id="altCorreta"class="tabela__head__titulo"></th>
                </tr>
            </thead>
            <tbody class="tabela__body"></tbody>
        </table>
        <p id="rodapeG">Fonte: <a id="rodapeLink" href='https://download.inep.gov.br/enade/provas_e_gabaritos/2021_GB_bacharelado_ciencia_computacao.pdf' target="_blank">Gabarito do ENADE</a></p>
        
    `;

    // Append both tables to the container
    container.appendChild(gabaritoCandidato);
    container.appendChild(gabaritoEnade);

    // Create the article element
    const articleElement = document.createElement('article');
    articleElement.classList.add('questContainer');

    // Append the container to the article element
    articleElement.appendChild(container);

    // Append the article to the main container
    const objtabla = document.querySelector('#gabarito-ancora');
    objtabla.appendChild(articleElement);

    // Loop to populate the Gabarito do Enade tbody
    const tbodyEnade = gabaritoEnade.querySelector('.tabela__body');
    for (var i = 0; i < maxRes; i++) {
        let quest = gaba[i];

        // Append each row to the tbody
        tbodyEnade.innerHTML += `
            <tr>
                <td class="tabela__body__texto"> ${quest.id}</td>
                <td class="tabela__body__texto">${quest.opcaoCorreta}</td>
            </tr>
        `;
    }
}



mostrarGabUp(); /* Visto que a pagina de gabarito é carregada, a função é chamada */