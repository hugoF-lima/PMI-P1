const tema = window.matchMedia('(prefers-color-scheme: dark)') //Constante que verifica se a preferencia de cor do usaurio é o tema Dark.
const icon = document.getElementById('favicon') //Constante que referencia tag HTML com ID 'favicon' para atribuição de conteudo.

if (tema.matches){
  //Caso tema preferido pelo usuario seja Dark: atribui Tag HTML com imagem Branca.
  icon.innerHTML = `<link rel="icon" href="../img/logoIcon.png" type="icon">`
}else{
  //Caso contrário atribui tag HTML com imagem preta.
  icon.innerHTML = `<link rel="icon" href="../img/preta-traparatrent.png" type="icon">`
}