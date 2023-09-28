import { gaba } from "./gaba.js"; //Importação do arquivo gaba.js
import { mostrarQuest } from "./app.js";
document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here
    montarIndexQuest();
});

function montarIndexQuest() {
    var pageElement = document.getElementById("navigationQuestion");
    var pageElementAdd = "";
    for (var i = 0; i < gaba.length; i++) {
        pageElementAdd += "<button class='navButton' onclick='mostrarQuest(" + (i + 1) + ")'>" + (i + 1) + "</button>";
    }

    pageElement.innerHTML = pageElementAdd;
}