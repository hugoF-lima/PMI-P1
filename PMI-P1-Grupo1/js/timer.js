var inter = setInterval(timer, 1000);

var [hour, min, sec] = [2,0,0];

function timer(){
  sec--;
  if(hour==0 && min==0 && sec==0){
    clearInterval(inter);
    alert('Tempo Finalizado!');
    location.assign('final.html');
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