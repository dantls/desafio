
const day_finish = 86400;

const init_diurno = converteHmsEmSegundos(05, 00);
const final_diurno = converteHmsEmSegundos(22, 00);
const period_diurno = final_diurno - init_diurno;


const init_noturno = converteHmsEmSegundos(22, 00);
const final_noturno = converteHmsEmSegundos(05, 00 );
const period_noturno = final_noturno - init_noturno;

function calculateHours(schedule){
  let hour;
  let minutes;

  hour = String(schedule.getHours()).padStart(2,'0');
  minutes = String(schedule.getMinutes()).padStart(2,'0');

  return converteHmsEmSegundos(hour, minutes)
}

function calculateSecToHours(time){
  let hour;
  let minutes;

  hour = Math.floor(time / 3600);
  minutes = Math.floor(time - (hour * 3600)) / 60;

  return (`${String(hour).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`)
}

function converteHmsEmSegundos(hr, mn){
  return (hr*3600) + (mn*60);
}


function calculator(start , end){
  let saida = {
    horas_noturnas:0,
    horas_diurnas:0
  }

  start = calculateHours(start)
  end = calculateHours(end)
  
  if(end > start && start >= init_diurno ){
    if(end < final_diurno){
      saida.horas_diurnas = (end-start)
    }else if(end < day_finish){
      saida.horas_diurnas += (final_diurno - start) 
      saida.horas_noturnas += (end - final_diurno)
    }
  }else if(end > start && start < init_diurno){
    if(start <= init_diurno && end < day_finish ){
      saida.horas_diurnas += (end - init_diurno) 
      saida.horas_noturnas += (init_diurno - start)
    }
   
  }else {
    if(end > init_diurno && start < final_diurno){
      saida.horas_diurnas += (final_diurno-start) + (end-init_diurno)
      saida.horas_noturnas += day_finish - final_diurno + init_diurno
    }
    else if(start <= init_diurno && end < init_diurno){
      saida.horas_noturnas += (init_diurno - start) + day_finish - final_diurno + end
      saida.horas_diurnas += final_diurno - init_diurno
    }
    else if(start > final_diurno && end > final_diurno){
      saida.horas_noturnas += (init_diurno - start) + (day_finish - final_diurno ) + end
      saida.horas_diurnas += final_diurno - init_diurno
     }
    else{
      saida.horas_noturnas += (day_finish - start ) + init_diurno
      saida.horas_diurnas += end - init_diurno 
    }
  }
  return({
    horas_diurnas: calculateSecToHours(saida.horas_diurnas),
    horas_noturnas:calculateSecToHours(saida.horas_noturnas)
  })
}
