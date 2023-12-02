var inter = setInterval(timer, 1000); //seta o valor de intervalo de loop para execução da função timer().

var [hour, min, sec] = [2, 0, 0]; //seta tempo limite para prova.

//função para calculo de tempo corrido do cronometro.
export function timer() {
  //Cada vez que a função é executada retira 1 segundo.
  sec--;
  //Verifiação se segundo, minutos e segundos estão zerados.
  if (hour == 0 && min == 0 && sec == 0) {
    //Caso o tempo tenha se esgotado: abre janela de alerta que o tempo acabou e relocaliza usuario para pagina 'final.html'.
    alert('Tempo Finalizado!');
    location.assign('final.html');
    //Tambem para a execução da função timer().
    clearInterval(inter);
  }
  //Caso segundos seja menor ou igual a 0, atribui 59 segundos e tira 1 minuto.
  if (sec <= 0) {
    sec = 59;
    min--;
    //Caso minuto seja menor ou igual a 0, atribui 59 segundos e tira 1 hora.
    if (min <= 0) {
      min = 59;
      hour--;
    }
  }
  //Passa o conteudo HTML por meio de innerHTML.
  document.getElementById('timer-input').innerHTML = `${hour}h ${min < 10 ? "0" + min : min}m ${sec < 10 ? "0" + sec : sec}s`;
}