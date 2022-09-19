const apiPublic = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';



// ENTRA EN LA API
const getData = () =>{
    const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;
    fetch(url) 
    .then(resp => resp.json())
        .then(json => printData(json))
        .catch(err => console.error(err))

};

getData();




// <!-- Paginador -->

// ENTRA EN LA API

let pagina = 1;

const getPage = async () => {
    const url = `https://gateway.marvel.com/v1/public/comics?offset=${pagina}&apikey=${apiPublic}`;
    const resp = await fetch(url)
    // console.log(url)
    const json = await resp.json()
    printData(json.results)
    console.log(json)
    return json;
}

getPage();





//PINTA LAS CARDS
const printData = json => {
    const array = json;
    // const array = json.data.results; // BELUUUUU LO TENIAS ASI - LO DEJO COMENTADO
    let card = '';
    array.forEach(comics => {
      const {images, title} = comics
        images.forEach(imagen => {
            const {path, extension} = imagen
            card += `   
            <div class="card mt-5 m-2 d-inline-flex" style="width: 17rem;">
                <img src="${imagen.path}.${imagen.extension}" class="card-img-top img-style" alt="...">
                <div class="card-body fw-bold py-2" style="height: 7rem;">
                    <p>${title}</p>
                </div>
            </div>`
            
            document.getElementById('cards').innerHTML = card
        });
    });

};



