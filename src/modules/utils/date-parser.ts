export const DateParser = (date: string): string => {
  const parsedDate = new Date(date);
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getUTCDate();
  const year = parsedDate.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const HourParser = (date: string): string => {
  const parsedDate = new Date(date);
  const hour = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  return `${hour}:${minutes} hrs`;
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
