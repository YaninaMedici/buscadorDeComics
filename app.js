const apiPublic = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';
const baseUrl = `http://gateway.marvel.com/v1/public/`

////////////////////////////////////

const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');
const firstPage = document.getElementById('first-page');
const previusPage = document.getElementById('previus-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');

const card = document.getElementById('card');

const comicsResultados = document.getElementById('comics-resultados');
const searchType = document.getElementById('search-type');
const filtroOrdenar = document.getElementById('filtro-ordenar');

let offset = 0;
let contadorDeResultados = 0;

//esta funcion va armando las URL
const armadoDeUrl = (buscador) => {
  let url = baseUrl;
  let parametroDeBusqueda = `?apikey=${apiPublic}&offset=${offset}` // se ocupa de meter parametros solamente
    
  if(!buscador){
    return parametroDeBusqueda
  }
  parametroDeBusqueda += `&orderBy=${filtroOrdenar.value}`

  // if(searchType.value === 'comics'){
  //   parametroDeBusqueda = `${searchType.value}${parametroDeBusqueda}`
  // }
  return parametroDeBusqueda
}


const entrandoALaApi = (recursoPrincipal, recursoId, recursoSecundario) => {
  const buscador = !recursoId && !recursoSecundario;
  let url = `${baseUrl}${recursoPrincipal}`;
  if(recursoId){
    url += `/${recursoId}`;
  }
  if(recursoSecundario){
    url += `/${recursoSecundario}`;
  }
  url += armadoDeUrl(buscador);
  return url;
}

//**********************************************/
// Actualizamos resultados contador
//**********************************************/
const actualizarResultados = (contador) => {
  comicsResultados.innerHTML = contador;
  contadorDeResultados = contador;
}

const pedirUrl = async url => {
  const respuesta = await fetch(url)
  const json = await respuesta.json();
  return json
}

const pedirTodosLosComics = async () => {
  const {data : {results, total}
  } = await pedirUrl(entrandoALaApi('comics'))
  imprimirComics(results)
  actualizarResultados(total)
}

//**********************************************/
// Pintamos los comics
//**********************************************/
const imprimirComics = (comics) => {
  if(comics.length === 0){
    card.innerHTML = `<h2>No hemos encontrado resultados</h2>`
  }
  for (const comic of comics) {
    card.tabIndex = 0;
    card.innerHTML += `
    <ul class="grid comic-style">
      <li>
        <figure>
          <img onclick="pedirComicId(${comic.id})" src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="${comic.title}"/>
          <figcaption>
            <h3>${comic.title}</h3>
          </figcaption>
        </figure>
      </li>
    </ul>`
  }
}
//**********************************************/
// Pedimos el comic con la Id
//**********************************************/
const pedirComicId = async (comicId) => {
  const {
    data : 
    {results : 
      [comic]
    }
  } = await pedirUrl(entrandoALaApi('comics', comicId));

  const imagen = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
  const titulo = comic.title
  const fechaLanzamiento = new Intl.DateTimeFormat('es-AR').format(
    new Date(comic.dates.find((date) => date.type === 'onsaleDate').date)
  )
  const guionista = comic.creators.items.filter((creator) => creator.role === 'writer')
  .map((creator) => creator.name).join(', ');

  const descripcion = comic.descriptions
  card.classList.add('visually-hidden')
  imprimirComicId(imagen, titulo, fechaLanzamiento, guionista, descripcion)
}

//**********************************************/
// Pintamos en detalle el comic
//**********************************************/
const imprimirComicId = (imagen, titulo, fechaLanzamiento, guionista, descripcion) => {
  let str = '';
    str = ` 
    <div class="detalles-card">
      <img src="${imagen}" alt="${titulo}"/>
    </div>      
    <div><h1>${titulo}</h1>
      <p>Publicado:${fechaLanzamiento}</p>
      <p>Guionistas:${guionista}</p>
      <p>Descripción:${descripcion}</p>
    </div>`

  document.getElementById('detalle-comic').innerHTML = str

}

const buscador = () => {
  if(searchType.value === 'comics'){
    pedirTodosLosComics()
  }
}

const inicio = () => {
  buscador()
}

window.onload = inicio;