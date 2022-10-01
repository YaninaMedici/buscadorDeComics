const apiPublic = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';

////////////////////////////////////

const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');
const firstPage = document.getElementById('first-page');
const previusPage = document.getElementById('previus-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');



//esta funcion va armando las URL

const baseUrl = `http://gateway.marvel.com/v1/public/`

let offset = 0;

const comicsResultados = document.getElementById('comics-resultados');
const searchType = document.getElementById('search-type');

const armadoDeUrl = (buscador) => {
    let url = baseUrl;
    let parametroDeBusqueda = `?apikey=${apiPublic}&offset=${offset}` // se ocupa de meter parametros solamente
    
    if(!buscador){
      return parametroDeBusqueda
    }
    
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
    // console.log(url);
    return url;
}


const pedirUrl = async url => {
    const respuesta = await fetch(url)
    const json = await respuesta.json();
    return json
    // console.log(respuesta)
}

const pedirTodosLosComics = async () => {
    const {data : {results, total}
        } = await pedirUrl(entrandoALaApi('comics'))
    imprimirComics(results)
    // console.log(results)
    // console.log(total)
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