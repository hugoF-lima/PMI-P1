const navBar = document.querySelector('#topNav'); //constante que referencia tag HTML para atribuição de conteudo.
const botomBar = document.querySelector('#botomNav'); //constante que referencia tag HTML para atribuição de conteudo.

//atribuição de conteúdo da topNav por innerHTML
navBar.innerHTML = `
<header class="navTopBar">
    <li id="dif"><a href="./index.html"><img src="../img/branca png.png" alt="LOGO"></a></li>
    <button class="nav-ham" arial><span class="sr-only">Menu</span></button>
    <ul class="topNav_container" data-visible="false">
        <li><a href="./index.html">Início</a></li>
        <li><a href="./tutorial.html">Instruções</a></li>
        <li><a href="./sobre.html">Sobre</a></li>
        <li><a href="./credito.html">Créditos</a></li>
        <li><a id="brightness"><img src="../img/brilho.png" /></a></li>
        <li><a id="high-contrast" data-depressed="0"><img src="../img/alto-contraste.png" /></a></li>
    </ul>
</header>
`
var header = document.querySelector('.topNav_container');
document.querySelector('.nav-ham').addEventListener('click', ()=>{
    const visible = header.getAttribute('data-visible');

    if(visible === "false"){
        header.setAttribute('data-visible', true);
    } else{
        header.setAttribute('data-visible', false);
    }
});


;

//atribuição de conteudo da bottomNav por innerHTML
botomBar.innerHTML = `
<footer class="botomNav">
    <a href="https://www.fateccarapicuiba.edu.br/" target="_blank"><img src="https://doity.com.br/media/doity/eventos/evento-60765-logo_organizador.png" alt="Logo_FATEC"></a>
    <a href="https://www.fateccarapicuiba.edu.br/analise-e-desenvolvimento-de-sistemas/" target="_blank"><img src="../img/adslogo.png" alt="Logo_ADS"></a>
    <a href="https://www.cps.sp.gov.br/" target="_blank"><img src="https://etecperuibe.com.br/wp-content/uploads/2021/02/Logo.png" alt="Logo_CPS"></a>
</footer>
`;