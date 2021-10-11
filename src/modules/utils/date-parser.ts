const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const shortMonths = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
  'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

export const DateParser = (date: string): string => {
  const parsedDate = new Date(date);
  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getUTCDate();
  const year = parsedDate.getFullYear();

  return `${day} de ${month} de ${year}`;
};

export const ShortDateParser = (date: string): string => {
  const parsedDate = new Date(date);
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getUTCDate();
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const DayMonthParser = (date: string): string => {
  const parsedDate = new Date(date);
  const month = shortMonths[parsedDate.getMonth()];
  const day = parsedDate.getUTCDate();

  return `${month} ${day}`;
};

export const HourParser = (date: string): string => {
  const parsedDate = new Date(date);
  const hour = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  return `${hour}:${minutes} hrs`;
};

export const TimeParser = (time: string): string => {
  const timeArray = time.split(':');
  let hour = Number(timeArray[0]);
  let dayR = 'am';
  if (hour > 12) {
    hour -= 12;
    dayR = 'pm';
  }
  const minutes = timeArray[1];
  return `${hour}:${minutes}${dayR}`;
};

export const ArrayErrorsToHTMLList = ( errors: Array<any> ): string => {
  let errorMessages = '';
  errors.forEach((i: any) => {
    if ( i.source ) {
      let field = i.source.pointer.split('/');
      field = field[field.length - 1];
      const unique = i.code === 'unique' ? true : false;
      if ( unique && field === 'email' ) {
        errorMessages += '<li>Hay una cuenta registrada con este correo electronico.</li>';
      } else if ( i.code !== 'blank' ) {
        errorMessages += `<li>${i.detail}: ${field}</li>`;
      }
    } else {
      if ( i.detail === 'Wrong credentials' ) {
        errorMessages += `<li>El correo o la contrasena son incorrectos (${i.detail}).</li>`;
      } else {
        errorMessages += `<li>${i.detail}</li>`;
      }
    }
  });
  return errorMessages;
};
