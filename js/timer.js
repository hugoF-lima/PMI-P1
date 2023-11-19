var inter = setInterval(timer, 1000); //seta o valor de intervalo de loop para execução da função timer()

var [hour, min, sec] = [2,0,0]; //seta tempo limite para prova

//função para calculo de tempo corrido do cronometro
export function timer(){
  sec--;
  if(hour==0 && min==0 && sec==0){
    alert('Tempo Finalizado!');
    location.assign('final.html');
    clearInterval(inter);
  }
  if(sec <= 0){
    sec = 59;
    min--;
    if(min <= 0){
      min = 59;
      hour--;
    }
  }
  document.getElementById('timer-input').innerHTML = `${hour}h ${min<10 ? "0"+min : min}m ${sec<10 ? "0"+sec : sec}s`;
}