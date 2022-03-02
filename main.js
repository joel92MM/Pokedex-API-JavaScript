/* creamos una constante que apuntara al selector del contenedor de pokemon */
const contenedorPokemon= document.querySelector('.contenedor-pokemon');
/* creamos una constante que apuntara al selector de la imagen al cargar la pagina */
const spinner= document.querySelector('#spinner');

/* cojemos el identificador de cada uno de los botones  y lo guardamos en una constante */

const anterior = document.querySelector("#previous");
const siguiente=document.querySelector("#next");



//cuantos pokemon se mostrara
var limit =8;
//desde que pokemon empieza
var offset=1;



/* añadimos al boton anterior un evento para que guarde la lista de pokemon anterior */

anterior.addEventListener("click", () => {
    /* agregamos una condicion if para ver en que pagina se encuentra
    significa que no estamos en la primera pagina */
    if(offset!=1){
        /* restamos los 10 pokemon anteriores para que no salgan en la siguiente pagina */
        offset-=9;
    /* antes de volver a los pokemon anteriores borra los actuales */
        eliminarNodoHijo(contenedorPokemon);
        traerPokemons(offset,limit);
    } 
});

/* añadimos al boton siguiente un evento click para que guarde la lista de pokemon siguiente */

siguiente.addEventListener("click", () => {
    /* sumamos los 10 pokemon siguientes para que salgan en la siguiente pagina */
    offset+=9;
    /* antes de volver a los pokemon siguientes borra los anteriores */
    eliminarNodoHijo(contenedorPokemon);
    traerPokemons(offset,limit);
});

/* function ordenar(fichero){
   return  fichero.sort(fichero.id-);
}
 */

/**
 * creamos una funcion que contendra la informacion de un pokemon de la api
 * @param {*} id identificador del pokemon
 */
function crearPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) =>{
        crearCartaPokemon(data);
        
        /* cuando la pagian este cargada no muestra el spinner */
        spinner.style.display ="none";
    });
}


/**
 * cojemos todos los pokemon de la api con la siguiente funcion
 * @param {*} number numero id del pokemon 
 
function traerPokemons(number){
     /* cuando la pagian este cargada muestra el spinner 
    spinner.style.display ="block";
    for (let i = 1; i <= number; i++) {
        /* llamamos a la funcion anterior para mostrar los datos de cada pokemon 
        crearPokemon(i);
    }
}
*/


/**
 * cojemos todos los pokemon de la api con la siguiente funcion
 * @param {*} offset determina en que posicion deseas empezar por ejemplo desde el pokemon 20 y que salgan 20 que es el limit
 * @param {*} limit muestra hasta cuantos pokemons puede mostrar
 */
 function traerPokemons(offse,limi){
    /* cuando la pagian este cargada muestra el spinner */
   spinner.style.display ="block";
   for (let i = offse; i <= offse + limi; i++) {
       /* llamamos a la funcion anterior para mostrar los datos de cada pokemon */
       crearPokemon(i);
   }
}



/**
 * Creamos la carta del pokemon con toda la informacion
 * @param {*} pokemon pokemon a crear
 */
function crearCartaPokemon(pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

     /* se crea el contenedor de la carta */
     const contenedorCarta = document.createElement('div');
     contenedorCarta.classList.add('card-container');

    flipCard.appendChild(contenedorCarta);

     

    /* crearemos el contenedor que contiene cada pokemon */
    const card =document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContenedor = document.createElement('div');
    spriteContenedor.classList.add('contenedor-imagen');
    /* crearemos el contenedor de la imagen */
    const imagen = document.createElement('img');
    imagen.src=pokemon.sprites.front_default;

    spriteContenedor.appendChild(imagen);

    const numero= document.createElement('p');
    numero.textContent=`#${pokemon.id.toString().padStart(3,0)}`;

    const nombre = document.createElement('p');
    nombre.classList.add('name');
    nombre.textContent=pokemon.nombre;

    card.appendChild(spriteContenedor);
    card.appendChild(numero);
    card.appendChild(nombre);

    /* se añade la carta de atras */
    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.textContent ="Carta de atrás"

    cardBack.appendChild(progressBars(pokemon.stats));

    contenedorCarta.appendChild(card);
    contenedorCarta.appendChild(cardBack);
    contenedorPokemon.appendChild(flipCard);
}
/**
 * Creamos una funcion para eliminar los nodos hijos
 * @param {} parent contenedor de los pokemons
 */
function eliminarNodoHijo(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/* llamamos a la funcion para mostrar los pokemon */
traerPokemons(offset,limit);

/**
 * Funcion que 
 * @param {*} estado barra de estado
 */
 function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  }