module.exports = function convertSecondsToHours(time){
  let hour;
  let minutes;

  hour = Math.floor(time / 3600);
  minutes = Math.floor(time - (hour * 3600)) / 60;

  return (`${String(hour).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`)
}