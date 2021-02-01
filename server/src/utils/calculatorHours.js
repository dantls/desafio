const convertHourToSeconds = require('./convertHoursToSeconds');
const convertSecondsToHours = require('./convertSecondsToHours');

const day_finish = 86400;
const init_diurno = convertHourToSeconds('05:00');
const final_diurno = convertHourToSeconds('22:00');

module.exports = function calculatorHours({from , to}){
  let saida = {
    horas_noturnas:0,
    horas_diurnas:0
  }

  start = convertHourToSeconds(from)
  end = convertHourToSeconds(to)

  if(end > start && start >= init_diurno ){
    if(end < final_diurno){
      saida.horas_diurnas = (end-start)
    }else if(end < day_finish){
      saida.horas_diurnas += (final_diurno - start) 
      saida.horas_noturnas += (end - final_diurno)
    }
  }else if(end > start && start < init_diurno){
    if(start <= init_diurno && end < init_diurno){
      saida.horas_noturnas = (end-start)
    }else if(start <= init_diurno && end < day_finish ){
      saida.horas_diurnas += (end - init_diurno) 
      saida.horas_noturnas += (init_diurno - start)
    }   
  }else {
    if( start < final_diurno && end > init_diurno ){
      saida.horas_diurnas += (final_diurno-start) + (end-init_diurno)
      saida.horas_noturnas += day_finish - final_diurno + init_diurno
    }
    else if(start >= final_diurno && end <= init_diurno){
      saida.horas_noturnas += day_finish - start + end
    }
    else if(start > final_diurno && end > final_diurno){
      saida.horas_noturnas += (init_diurno - start) + (day_finish - final_diurno ) + end
      saida.horas_diurnas += final_diurno - init_diurno
     }
    else if(start <= init_diurno && end < init_diurno){
      saida.horas_noturnas += (init_diurno - start) + day_finish - final_diurno + end
      saida.horas_diurnas += final_diurno - init_diurno
    }
    else{
      saida.horas_noturnas += (day_finish - start ) + init_diurno
      saida.horas_diurnas += end - init_diurno 
    }
  }
  return({
    horas_diurnas: convertSecondsToHours(saida.horas_diurnas),
    horas_noturnas:convertSecondsToHours(saida.horas_noturnas)
  })
}

