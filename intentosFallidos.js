// Trate de implementar esta funcion pero no sincronizo
  // el evento con el envio al estado local al ejecutarlas
  // por separado o al incluir la ejecución en la función
  // handleChangeForm
  // --------------------------------------------------------

//                    COMPONENT FORM
// ----------------------------------------------------
const handleChangeRating = (event) => {
  const { value } = event.target;
  if(value < 0 || value > 5 ){
    event.preventDefault();
    setMessage(`El rating min es 0 y el max es 5`);
    openModal();
    return;
  }
  setCreateGameForm({rating: value});
};

const handleChangeGender = (event) => {
  const { value, name } = event.target;
  const aux = createGameForm.genres.includes(value);
  if(aux){
    setMessage(`El genero ${value} ya fue agregado`);
    openModal();
    return;
  }
  if(createGameForm.genres.length > 5){
    setMessage(`Solo puedes agregar hasta 6 generos`);
    openModal();
    return;
  }
  setCreateGameForm({
    ...createGameForm,
    genres: [...createGameForm.genres, value]
  });
};

const handleChangePlatforms = (event) => {
  const { value, name } = event.target;
  const aux = createGameForm.platforms.includes(value);
  if(aux){
    setMessage(`La plataforma ${value} ya fue agregada`);
    openModal();
    return;
  }
  if(createGameForm.platforms.length > 5){
    setMessage(`Solo puedes agregar hasta 6 plataformas`);
    openModal();
    return;
  }
  setCreateGameForm({
    ...createGameForm,
    platforms: [...createGameForm.platforms, value]
  });
};

