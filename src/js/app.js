import { gaba } from "./gaba.js";

const content = document.querySelector('#bloco');

gaba.map(questao =>{
    content.innerHTML += `
    <header>
        <ul class="topNav">
            <li class="dif"><a href=""><img src="" alt="Logo ENADE"></a></li>
            <li><a href="">Tutorial</a></li>
            <li><a href="">Sobre</a></li>
        </ul>
    </header>

        <article class="container">
            <h1>Exame de Ciência da Computação (Bacharelado)</h1> 
            <h3>Questão ${questao.id}</h3>
            ${questao.img.map(img =>{
                return `
                <img src="${img.imgScr}" alt="Imagem da Questão" >
                `
            })
        .join('')}
            <p><b>${questao.enunciado}</b></p>

            <div class="alter">
                ${questao.opcoes
                    .map(opcao => {
                      return `
                        <div class="opcao">
                            <input class="questao__opcoes__opcao" type="radio" id="${questao.id}_${opcao.id}" " name="${questao.id} value="${opcao.id}">
                            <label class="questao_opcoes__texto" for="${questao.id}_${opcao.id}"><span class="alter_id">${opcao.id})</span> ${opcao.texto}</label> <br>
                        </div>
                    `;
                    })
                    .join('')}
            </div>
            
            <div class="btns">
                <button type="submit" id="dif">Anterior</button>
                <button type="submit">Verificar</button>
                <button type="submit">Próxima</button>
            </div>

        </article>
  
    <footer class="botomNav">
        <img src="../../img/logoFatec.png" alt="Logo FATEC">
        <img src="../../img/logoADS.png" alt="Logo ADS">
        <img src="../../img/logoCPS.png" alt="Logo CPS">
    </footer>
    `;
});