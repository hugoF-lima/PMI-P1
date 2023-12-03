let [hour, min, sec] = [2, 0, 0]; // Set initial time limit
let inter;

// Checa se há tempo sendo transcorrido caso o usuário recarregue a pagina durante o teste.
const savedTime = JSON.parse(localStorage.getItem("timerValues"));

if (savedTime) {
  //Se houver tempo salvo, ele mantem para que continue sendo calculado.
  [hour, min, sec] = savedTime;
}

// Inicia se o timer
inter = setInterval(timer, 1000);

export function timer() {
  sec--;

  if (hour == 0 && min == 0 && sec == 0) {
    alert('Tempo Finalizado!');
    clearInterval(inter);
    localStorage.removeItem("timerValues"); // Caso o tempo zere, o item é removido do storage.
  }

  if (sec < 0) {
    sec = 59;
    min--;

    if (min < 0) {
      min = 59;
      hour--;

      if (hour < 0) {
        // Timer reached zero, do something if needed
        clearInterval(inter);
        localStorage.removeItem("timerValues");
      }
    }
  }

  document.getElementById('timer-input').innerHTML = `${hour}h ${min < 10 ? "0" + min : min}m ${sec < 10 ? "0" + sec : sec}s`;

  // Save the current timer values in localStorage
  localStorage.setItem("timerValues", JSON.stringify([hour, min, sec]));
}
