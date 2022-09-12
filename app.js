const apiPublic = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';

const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

fetch(url) 
    .then(resp => resp.json())
    .then(json => console.log(json))



