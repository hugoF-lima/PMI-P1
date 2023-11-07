document.getElementById('').addEventListener('click', ()=>{
  var inter = setInterval(timer, 1000);
});

var [hour, min, sec] = [2,0,0];

function timer(){
  sec--;
  if(sec <= 0){
    sec = 59;
    min--;
    if(min <= 0){
      min = 59;
      hour--;
      if(hour==0 & min==0 & sec==0){
        clearInterval(inter);
      }
    }
  }
  document.getElementById('').innerHTML = `${hour}h ${min}m ${sec}s`;
}