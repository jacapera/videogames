# **Explicación carga dinamica de los modelos**

```bash
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
```

### Este código se encarga de leer y cargar dinámicamente los archivos de modelos de Sequelize presentes en la carpeta "models". Aquí tienes una explicación línea por línea:

- **`const basename = path.basename(__filename)`**: Esta línea obtiene el nombre del archivo actual (el archivo en el que se encuentra este código) utilizando la función basename del módulo path.
- **`const modelDefiners = []`**: Crea un arreglo vacío llamado modelDefiners que se utilizará para almacenar los modelos definidos en los archivos.
- **`fs.readdirSync(path.join(__dirname, '/models'))`**: Utilizando el módulo fs, se lee de forma síncrona el contenido de la carpeta "models". __dirname representa la ruta del directorio actual.
- **`.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))`**: Filtra los archivos leídos para excluir aquellos que comienzan con un punto (archivos ocultos), el archivo actual y aquellos que no tengan una extensión ".js".
- **`.forEach((file) => { modelDefiners.push(require(path.join(__dirname, '/models', file))); });`**: Itera sobre los archivos filtrados y requiere cada archivo usando require, luego agrega el resultado al arreglo modelDefiners. Esto carga los modelos en memoria.
- **`modelDefiners.forEach(model => model(sequelize))`**: Itera sobre los modelos cargados y ejecuta cada función modelo pasándole la instancia de Sequelize sequelize. Esto inyecta la conexión de Sequelize en cada modelo.
- **`let entries = Object.entries(sequelize.models)`**: Obtiene las entradas (pares clave-valor) del objeto sequelize.models que contiene todos los modelos cargados.
- **`let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])`**: Convierte las claves de los modelos a formato de capitalización (es decir, la primera letra en mayúscula) utilizando la función toUpperCase() y slice(). Esto se hace para seguir las convenciones de nomenclatura de Sequelize, donde los nombres de los modelos comienzan con letra mayúscula.
- **`sequelize.models = Object.fromEntries(capsEntries)`**: Reconstruye el objeto sequelize.models utilizando las nuevas entradas capitalizadas, reemplazando el objeto anterior. Esto actualiza los nombres de los modelos en sequelize.models con la capitalización adecuada.

### En resumen, este código lee y carga dinámicamente los modelos de Sequelize presentes en la carpeta "models", inyecta la conexión de Sequelize en cada modelo y ajusta los nombres de los modelos a la convención de capitalización adecuada. Esto facilita la interacción con los modelos en otras partes de la aplicación.

<br />

# **Explicación busqueda máximo ID y agregar nuevo ID**

```bash
let max = await Videogame.findAll({
    attributes: [Sequelize.fn('max',Sequelize.col('id'))],
    raw: true,
    })
```
- **`let max:`** Esto declara una variable llamada "max" para almacenar el resultado de la consulta.
- **`await Videogame.findAll({ ... })`**: Utilizando el modelo "Videogame" definido en Sequelize, se invoca el método findAll() para realizar una consulta a la tabla "Videogame".
- **`attributes: [Sequelize.fn('max',Sequelize.col('id'))]`**: Con el atributo attributes, especificas las columnas que deseas incluir en el resultado de la consulta. En este caso, se utiliza Sequelize.fn('max', Sequelize.col('id')) para obtener el valor máximo de la columna "id".
- **`raw: true`**: La opción raw se establece en true para que el resultado de la consulta sea un objeto plano (sin instancias de modelos de Sequelize), lo que facilita la extracción del valor máximo.
- **`})`**: Cierra el objeto de opciones y finaliza la llamada al método findAll().

### El resultado de esta consulta será un objeto que contiene el valor máximo de la columna "id" en la tabla "Videogame". Puedes acceder a ese valor utilizando max[0].max (suponiendo que el resultado de la consulta no está vacío).

<br />

```bash
id: ++max[0].max,
```
### La expresión id: ++max[0].max incrementa el valor de max[0].max en 1 y lo asigna como valor del campo id. Asumiendo que max es un arreglo que contiene un objeto con la propiedad max, esta expresión realiza lo siguiente:

- **`max[0].max`**: Accede al primer elemento del arreglo max y luego a la propiedad max del objeto contenido en ese elemento. Es decir, obtiene el valor actual de max.
- **`++max[0].max`**: Incrementa el valor de max en 1 utilizando el operador de incremento ++. Después de esta operación, el valor de max será incrementado en 1.
- **`id: ++max[0].max`**: Asigna el valor incrementado de max al campo id. Esto significa que el campo id tendrá el valor resultante de incrementar en 1 el valor anterior de max.

### En resumen, esta expresión se utiliza para generar un nuevo valor para el campo id al incrementar en 1 el valor actual de max. Es comúnmente utilizado para asignar identificadores únicos y secuenciales a elementos en una base de datos o estructura de datos.

<br/>

# La posición del operador de incremento ++ en relación al operando puede hacer una diferencia en el resultado de la expresión. Veamos las diferencias:

###  1. Incremento preincremento (++valor): En este caso, el operador de incremento ++ se coloca antes del operando. El incremento se realiza antes de que se evalúe la expresión. Por lo tanto, el valor se incrementa y luego se utiliza en la expresión.

Ejemplo:
```bash
let x = 5;
let y = ++x;
console.log(x); // Output: 6
console.log(y); // Output: 6
```
### En este ejemplo, x se incrementa en 1 antes de asignar su valor a y. Por lo tanto, tanto x como y tienen un valor de 6.

<br/>

### 2. Incremento postincremento (valor++): En este caso, el operador de incremento ++ se coloca después del operando. El incremento se realiza después de que se evalúe la expresión. Por lo tanto, el valor se utiliza en la expresión y luego se incrementa.

Ejemplo:
```bash
let x = 5;
let y = x++;
console.log(x); // Output: 6
console.log(y); // Output: 5
```
### En este ejemplo, x se asigna a y y luego se incrementa en 1. Por lo tanto, x tiene un valor de 6, pero y conserva el valor original de 5.

<br/>

### En resumen, la diferencia entre colocar el operador de incremento al inicio o al final radica en el momento en que se realiza el incremento en relación a la evaluación de la expresión. Dependiendo de cómo se utilice, puede haber diferencias en el resultado final.

<br/>

# **Includes**

### La cláusula **`include`** se utiliza para indicar qué relaciones asociadas deben ser incluidas en el resultado de la consulta.
ejemplo
```bash
const { Videogame, Genre } = sequelize.models;

const showGame = await Videogame.findOne({
  where: { name: videojuego.name },
  include: [Genre],
});
```
### En este caso, estamos utilizando **`Videogame`** y **`Genre`** de **`sequelize.models`** para acceder a los modelos correspondientes.

### La consulta **`findOne`** se realiza en el modelo **`Videogame`**. En el bloque **`include`**, especificamos la relación asociada que deseamos incluir, que es **`Genre`** en este caso. Sequelize se encargará de buscar la tabla asociada y realizar la consulta correspondiente para obtener los registros de género asociados al juego.

### Recuerda que el nombre Genre debe coincidir con el nombre definido en el modelo de Sequelize para la asociación entre Videogame y Genre.

<br/>

### Si deseas personalizar el nombre del atributo en el include, puedes hacerlo utilizando el objeto de opciones. Por ejemplo:
```bash
const showGame = await Videogame.findOne({
  where: { name: videojuego.name },
  include: [
    { model: Genre, as: 'Genres' }, // Especificamos el nombre del atributo en el modelo Videogame como 'Genres'
  ],
});
```
<br/>

### Cuando deseas relacionar múltiples tablas en Sequelize, puedes usar la misma estructura del objeto include para especificar las relaciones adicionales. Aquí tienes un ejemplo de cómo se vería la sintaxis:
```bash
const showGame = await Videogame.findOne({
  where: { name: videojuego.name },
  include: [
    { model: Genre, as: 'Genres' }, // Relación Videogame - Genre
    { model: Platform, as: 'Platforms' }, // Relación Videogame - Platform
    { model: Developer, as: 'Developers' }, // Relación Videogame - Developer
    // Otras relaciones que desees incluir...
  ],
});
```
El alias es opcional

<br/>