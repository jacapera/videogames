export default function validation({name, description, image, rating, genres, platforms, released}) {
  const errors = {};
  const regexName = /^[a-zA-Z0-9\s]+$/i
  //const regexURLImage = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/i
  console.log(name);

  // Validación del NOMBRE
  // if(!name) errors.name = "El nombre es requerido";
  // if(!regexName.test(name)) errors.name = "El nombre no puede tener caracteres especiales";
  // if(name.length < 5 || name.length > 30) errors.name = "El nombre de tener mínimo 4 y máximo 30 caracters";
  if(!name){
    errors.name = "El nombre es requerido";
  } else if(name.length < 5 || name.length > 30) {
    errors.name = "El nombre de tener mínimo 5 y máximo 30 caracters";
  } else  if(!regexName.test(name)){
    errors.name = "El nombre no puede tener caracteres especiales";
  }

  // Validación de la DESCRIPCIÓN
  if(description.length < 30 || description.length > 250) errors.description = "La descripcion debe ser mínimo 30 y máximo 250 caracteres";
  if(!description) errors.description = "Debe ingresar una descripción";

  // Validación de la URL image
  //if(!regexURLImage.test(image)) errors.image = "Debe ingresar una Url valida";
  if(!image) errors.image = "Debe ingresar una Url";

  // Validación para el RATING
  if(rating === "0") errors.rating = "Debes asignar un Rating";

  // Validación GENEROS
  if(!genres.length) errors.genres = "Debes seleccionar al menos un Genero";

  // Validación PLATFORMS
  if(!platforms.length) errors.platforms = "Debe seleccionar al menos una Plataforma";

  // Validación RELEASED
  if(!released) errors.released = "Debe ingresar una fecha de lanzamiento";

  console.log(errors)
  return errors;
}