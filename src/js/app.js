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
                <div>
                    <input type="radio" name="isgift" id="isgift0" value="0"/>
                    ${questao.opcoes.map(opcoes =>{
                        return `
                        <label for="isgift0">A.${opcoes.texto}</label>
                        `
                    })
                .join('')}
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift1" value="1"/>
                    ${questao.opcoes.map(opcoes =>{
                        return `
                        <label for="isgift1">B. ${opcoes.texto}</label>
                        `
                    })
                .join('')}
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift2" value="2"/>
                    ${questao.opcoes.map(opcoes =>{
                        return `
                        <label for="isgift2">C. ${opcoes.texto}</label>
                        `
                    })
                .join('')}
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift3" value="3"/>
                    ${questao.opcoes.map(opcoes =>{
                        return `
                        <label for="isgift3">D. ${opcoes.texto}</label>
                        `
                    })
                .join('')}                    
                </div>
                <div>
                    <input type="radio" name="isgift" id="isgift4" value="4"/>
                    ${questao.opcoes.map(opcoes =>{
                        return `
                        <label for="isgift4">E. ${opcoes.texto}</label>
                        `
                    })
                .join('')}
                </div>
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
})