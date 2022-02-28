/* creamos una constante que apuntara al selector del contenedor de pokemon */
const contenedorPokemon= document.querySelector('.contenedor-pokemon');
/* const spinner= document.querySelector('.spinner-border');
 */


/**
 * creamos una funcion que contendra la informacion de un pokemon de la api
 * @param {*} id identificador del pokemon
 */
function crearPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) =>
        crearPokemon(data)
    );
}


/**
 * cojemos todos los pokemon de la api con la siguiente funcion
 * @param {*} number numero id del pokemon 
 */
function traerPokemons(number){
    for (let i = 1; i <= number; i++) {
        /* llamamos a la funcion anterior para mostrar los datos de cada pokemon */
        crearPokemon(i);
    }
}

/**
 * Creamos la carta del pokemon con toda la informacion
 * @param {*} pokemon pokemon a crear
 */
function crearCartaPokemon(pokemon){
    const card =document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContenedor = document.createElement('div');
    spriteContenedor.classList.add('contenedor-imagen');

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

    contenedorPokemon.appendChild(card);
}

traerPokemons(9);