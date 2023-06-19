// Función para validar el formato de fecha que llega para el campo released
const formatDate = (date) => {
  // Verificar si el formato es dd-mm-yyyy
  const ddmmFormat = /^\d{2}-\d{2}-\d{4}$/;
  if(ddmmFormat.test(date)){
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    date = formattedDate;
    return date;
  }
  // Verificar si el formato es yyyy-mm-dd
  const yyyymmFormat = /^\d{4}-\d{2}-\d{2}$/;
  if(yyyymmFormat.test(date)){
    return date;
  }
  // Si me viene un formato de fecha invalido
  const error = new Error('Formato de fecha invalido');
  error.statusCode = 400;
  throw error;
};

module.exports = formatDate;