const tema = window.matchMedia('(prefers-color-scheme: dark)')
const icon = document.getElementById('favicon')

if (tema.matches){
  icon.innerHTML = `<link rel="icon" href="../img/logoIcon.png" type="icon">`
}else{
  icon.innerHTML = `<link rel="icon" href="../img/preta traparatrent.png" type="icon">`
}