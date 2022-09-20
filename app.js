const apiPublic = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';

////////////////////////////////////

const comicsResultados = document.getElementById('comics-resultados');


// ENTRA EN LA API

let pagina = 0;
// let total = 0;
let resultadoComics = 0;


const getData = async () => {
    const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=${pagina}&apikey=${apiPublic}`
    const resp = await fetch(url);
    const json = await resp.json();
    printData(json.data.results);
    getPage(json.data.results)

    const resultadoComics = json.data.total;
    paginaActual.innerHTML = pagina

    // CREO QUE EL TOTAL PAGINA NO VA!!!!!!
    //totalPaginas.innerHTML = paginasArray


    comicsResultados.innerHTML = resultadoComics 

    updatePage()

}

getData();



//PINTA LAS CARDS
const printData = (json) => {
    const array = json;
    let card = '';
    array.forEach(comics => { 
      const {thumbnail, images, title, id} = comics

   for (const imagen in thumbnail ) {
    if (Object.hasOwnProperty.call(thumbnail , imagen)) {

    }
   }
     card += `   
            <div class="card mt-5 m-2 d-inline-flex" style="width: 17rem;">
                <img src="${thumbnail.path}.${thumbnail.extension}" class="card-img-top img-style" alt="..." data-id="${id}">
                <div class="card-body fw-bold py-2" style="height: 7rem;">
                    <p>${title}</p>
                </div>
            </div>`
            
          document.getElementById('cards').innerHTML = card

    });

};


// <!-- Paginador -->

// ENTRA EN LA API

// let pagina = 1;

// const getPage = async () => {
//     EL CATCH TIRA ERROR!!!
//     const url = `https://gateway.marvel.com/v1/public/comics?offset=${pagina}&apikey=${apiPublic}`;
//     fetch(url) 
//         .then(resp => resp.json())
//         .then(json => {
//             printData(json.results)
//             data = json;
//         })
//         .catch(err => console.error(err))
//     ---------------------------------------------
//     ESTO FUNCIONA Y SE VE LA apiPrivate, PERO NO CAMBIA DE PAGINA Y MUESTRA MAS DE 20
//     const url = `https://gateway.marvel.com/v1/public/comics?offset=${pagina}&apikey=${apiPublic}`;
//     const resp = await fetch(url)
//     console.log(resp)
//     ---------------------------------------------
//     ESTE NO FUNCIONA ENTRA EN CONFLICTO CON PRINTDATA Y GETDATA!!!
//     const url = `https://gateway.marvel.com/v1/public/comics?offset=${pagina}&apikey=${apiPublic}`;
//     const resp = await fetch(url)
//     // console.log(resp)
//     // console.log(url)
//     const json = await resp.json()
//     printData(json.results)
//     console.log(json)
//     return json;
// }

// getPage();





// <!-- Paginador -->

//lastpage creo que esta mal, creo q eso es la cantidad de paginas que tiene el comic
//No encontre un total de pagina. si tiene un total de comincs
// no se si hay q decirle de ese total que pinte solamente 20 y de ahi y sumando o restando 20

const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');

const firstPage = document.getElementById('first-page');
const previusPage = document.getElementById('previus-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');

const getPage =  (json) => {
    nextPage.addEventListener('click', () => {
        pagina += 1;
       getData()
    });
    previusPage.addEventListener('click', () => {
        pagina -= 1;
       getData()
    });
    lastPage.addEventListener('click', () =>{
        //esto esta MAL
       // console.log(json)
        if(pagina <= json[0].pageCount){
            pagina =json[0].pageCount
            getData()
        }
      })
      firstPage.addEventListener('click', () =>{
         if(pagina >= 2){
            pagina = 1
            getData()
        }
      })
}








//esto lo hice asi porque tenia el color negro el la etiqueta de html
//otra opcion puede ser hacerlo desde el css y agrupar las clases que
// necesitamos y despues con un togle creo q podria andar.


const updatePage = () => {
    if(pagina <= 1){
      previusPage.classList.add('disabled');
      previusPage.classList.remove('text-bg-dark');
      previusPage.classList.add('bg-secondary');
      firstPage.classList.add('disabled');
      firstPage.classList.remove('text-bg-dark');
      firstPage.classList.add('bg-secondary');
    }else{
      previusPage.classList.remove('disabled');
      previusPage.classList.add('text-bg-dark');
      previusPage.classList.remove('bg-secondary');
      firstPage.classList.remove('disabled');
      firstPage.classList.add('text-bg-dark');
      firstPage.classList.remove('bg-secondary');
    }
    if(pagina === total){
    
      nextPage.classList.add('disabled');
      nextPage.classList.remove('text-bg-dark');
      nextPage.classList.add('bg-secondary');
      lastPage.classList.add('disabled');   
      lastPage.classList.remove('text-bg-dark');
      lastPage.classList.add('bg-secondary');

    // }else{
    //   nextPage.classList.remove('disabled');
    //   nextPage.classList.add('text-bg-dark');
    //   nextPage.classList.remove('bg-secondary');
    //   lastPage.classList.remove('disabled');
    //   lastPage.classList.add('text-bg-dark');
    //   lastPage.classList.remove('bg-secondary');
     }
      
  }
