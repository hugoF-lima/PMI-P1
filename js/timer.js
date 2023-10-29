const now = new Date();
const time = [now.getHours(), now.getMinutes(),now.getSeconds()]
time[2]<10 ? `${time[2] = `0${time[2]}`}` : `${time[2]}`;