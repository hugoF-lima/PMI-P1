const navBar = document.querySelector('#topNav');
const botomBar = document.querySelector('#botomNav');

navBar.innerHTML = `
<header>
<ul class="topNav_container">
    <li id="dif"><a href="./index.html"><img src="../img/newSimucadLogoCrop.jpeg" alt="LOGO"></a></li>
    <li><a href="./tutorial.html">Tutorial</a></li>
    <li><a href="./sobre.html">Sobre</a></li>
    <li><a href="./credito.html">Créditos</a></li>
    <li>
        <a href="#">Acessibilidade</a>
        <div class="dropdown">
            <a href="#">Modo Noturno</a>
            <a href="#">Modo Escuro</a>
            <a href="#">Alto Contraste</a>
        </div>    
    </li>
</ul>
</header>
`;

/* <li class="dropdown"><a>Acessibilidade</a>
        <div class="dropdownContent">
            <a>Modo noturno</a>
            <a>Auto contraste</a>
            <a>Modo escuro</a>
        </div>
    </li> */

botomBar.innerHTML = `
<footer class="botomNav">
    <a href="https://www.fateccarapicuiba.edu.br/" target="_blank"><img src="https://doity.com.br/media/doity/eventos/evento-60765-logo_organizador.png" alt="Logo_FATEC"></a>
    <a href="https://www.fateccarapicuiba.edu.br/analise-e-desenvolvimento-de-sistemas/" target="_blank"><img src="../img/adslogo.png" alt="Logo_ADS"></a>
    <a href="https://www.cps.sp.gov.br/" target="_blank"><img src="https://etecperuibe.com.br/wp-content/uploads/2021/02/Logo.png" alt="Logo_CPS"></a>
</footer>
`;