const navBar = document.querySelector('#topNav'); //constante que referencia tag HTML para atribuição de conteudo.
const botomBar = document.querySelector('#botomNav'); //constante que referencia tag HTML para atribuição de conteudo.

/* #Criar um localstorage ao entrar na pagina, quando clica, executa a função, usar um numero */
export function setStyle(style) {

    const body = document.body;
    /* const input = document.getElementById(`${style}`); //identificando o elemento selecionado no menu a */
    /* TODO: Verificar se é possível puxar o body a partir do parametro do estilo  */

    /* body.classList.remove('normal', 'dark-mode', 'high-contrast'); */

    body.classList.remove('normal', 'high-contrast');
    body.classList.toggle(style);

    console.log(style);
    armazTema(style);
    // Remover estilos existentes
    // Adicionar estilo selecionado
    /* body.classList.add(style); */
}

function toggleSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const isSliderVisible = sliderContainer.style.display === 'flex';
    const storedBrightness = localStorage.getItem('brightnessValue');

    // Apply the stored brightness value to the webpage
    if (storedBrightness !== null) {
        adjustFilterIntensity(storedBrightness * 50); // Multiply by 50 to convert back to the slider scale (0-100)

        // Set the slider value to the stored brightness
        const slider = document.getElementById('filterIntensity');
        if (slider) {
            slider.value = storedBrightness * 100; // Assuming the slider range is 0-100
        }
    }

    if (isSliderVisible) {
        // Fazer com que obtenha o valor do slider!
        sliderContainer.style.display = 'none';
        /* resetFilter(); */
    } else {
        // If the slider is hidden, show it
        sliderContainer.style.display = 'flex';
    }
}

export function adjustFilterIntensity(intensity) {
    console.log(intensity);
    // Garantir que o valor esteja entre 0 e 100
    intensity = Math.max(0, Math.min(100, intensity));

    // Convert intensity to a brightness value between 0 and 2
    const brightnessValue = intensity / 50;

    // Apply the brightness filter to the body of the webpage
    document.body.style.filter = `brightness(${brightnessValue})`;
    /* document.querySelector('.content-container').style.filter = `brightness(${brightnessValue})`; */

    // Store the brightness value in localStorage
    localStorage.setItem('brightnessValue', brightnessValue);

    // You can also apply the filter to specific elements if needed
    // For example, adjust the brightness of an element with the ID 'content'
    // document.getElementById('content').style.filter = `brightness(${brightnessValue})`;
}

//Esse codigo é um resquicio do filtro amarelo
/* const filterIntensity = value / 100;
const filterColor = `rgba(255, 255, 0, ${filterIntensity})`; // Yellow filter

document.body.style.filter = `sepia(${filterIntensity}) hue-rotate(30deg) saturate(200%) brightness(100%) contrast(80%)`;
document.body.style.backgroundColor = filterColor; */

function armazTema(opcaoSelect) {
    const paraObjt = JSON.parse(localStorage.getItem('Tema')) || {}; //criação do objeto "Tema"
    const paraJson = JSON.stringify(opcaoSelect);  //contante para troca de objeto para JSON
    localStorage.setItem('Tema', paraJson); //passar objeto para JSON para atribuição de valores
    console.log(localStorage);
};

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
        <li><a id="brightness"><img src="../img/brilho.png" class="inverted-image"/></a></li>
        <li><a id="high-contrast" data-depressed="0"><img src="../img/alto-contraste.png" /></a></li>
    </ul>
    <div id="slide" class="slider-container" style="display: none;">
        <label for="filterIntensity">Brilho: </label>
        <input type="range" name="temp" id="filterIntensity" min="15" max="100" value="0" step="1">
    </div>
</header>
`;

document.querySelector('#brightness').addEventListener('click', () => {
    toggleSlider();
});

document.querySelector('#filterIntensity').addEventListener('input', (event) => {
    adjustFilterIntensity(event.target.value);
});

document.querySelector('#high-contrast').addEventListener('click', (event) => {
    console.log('does this fire?');
    const button = event.currentTarget;
    const isPressed = button.getAttribute('data-pressed') === '1';

    // Ativar o estado
    button.setAttribute('data-pressed', isPressed ? '0' : '1');

    // Usar a função de estilo de acordo com p parâmetro passado.
    setStyle(isPressed ? 'normal' : 'high-contrast');
});

var header = document.querySelector('.topNav_container');
document.querySelector('.nav-ham').addEventListener('click', () => {
    const visible = header.getAttribute('data-visible');

    if (visible === "false") {
        header.setAttribute('data-visible', true);
    } else {
        header.setAttribute('data-visible', false);
    }
});


;

//atribuição de conteudo da bottomNav por innerHTML
botomBar.innerHTML = `
<footer class="botomNav">
    <a href="https://www.fateccarapicuiba.edu.br/" target="_blank"><img src="https://doity.com.br/media/doity/eventos/evento-60765-logo_organizador.png" alt="Logo_FATEC"></a>
    <a href="https://www.fateccarapicuiba.edu.br/analise-e-desenvolvimento-de-sistemas/" target="_blank"><img src="../img/adslogo.png" id="logo-ads" alt="Logo_ADS"></a>
    <a href="https://www.cps.sp.gov.br/" target="_blank"><img src="https://etecperuibe.com.br/wp-content/uploads/2021/02/Logo.png" alt="Logo_CPS"></a>
</footer>
`;

const verifiPass = JSON.parse(localStorage.getItem('Tema')) || 'normal';
setStyle(verifiPass);