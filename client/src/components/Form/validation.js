export default function validation({name, description, image, rating, genres, platforms, released}) {
  const errors = {};
  const regexName = /^[a-zA-Z0-9\s]+$/i
  const regexURLImage = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/i
  //console.log(name);

  // Validación del NOMBRE
  !name ? errors.name = "El nombre es requerido"
  : (name.length < 5 || name.length > 30) ? errors.name = "El nombre de tener mínimo 5 y máximo 30 caracters"
  : (!regexName.test(name)) && (errors.name = "El nombre no puede tener caracteres especiales");

  // Validación de la DESCRIPCIÓN
  (description.length < 30 || description.length > 250) && (errors.description = "La descripcion debe ser mínimo 30 y máximo 250 caracteres");
  !description && (errors.description = "Debe ingresar una descripción");

  // Validación de la URL image
  !image && (errors.image = "Debe ingresar una Url");
  !(regexURLImage.test(image)) && (errors.image = "Debe ingresar una Url valida");

  // Validación para el RATING
  Number(rating) === 0 && (errors.rating = "Debes asignar un Rating");

  // Validación GENEROS
  !genres.length && (errors.genres = "Debes seleccionar al menos un Genero");

  // Validación PLATFORMS
  !platforms.length && (errors.platforms = "Debe seleccionar al menos una Plataforma");

  // Validación RELEASED
  !released && (errors.released = "Debe ingresar una fecha de lanzamiento");

  //console.log(errors)
  return errors;
}