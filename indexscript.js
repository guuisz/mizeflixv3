function Anime2(nome, descricao, legenda, imagemURL, episodios, descricaoCompleta, nota) {
    this.nome = nome;
    this.descricao = descricao;
    this.legenda = legenda;
    this.imagemURL = imagemURL;
    this.episodios = episodios;
    this.descricaoCompleta = descricaoCompleta
    this.nota = nota;
}

function Episodio(numero, titulo, descricao, imagemURL, driveLink) {
    this.numero = numero;
    this.titulo = titulo;
    this.descricao = descricao;
    this.imagemURL = imagemURL;
    this.driveLink = driveLink;
}

function Anime(titulo, legenda, imagemURL, indexTela) {
    this.titulo = titulo;
    this.legenda = legenda;
    this.imagemURL = imagemURL;
    this.indexTela = indexTela;
}
/*
let anime1 = new Anime('Ping Pong the Animation', 'Dub | Leg' , 'imgs/anime1.png',0);
let anime2 = new Anime('Kuroko Basketball', 'Legendado' , 'imgs/anime2.png',1);
let anime3 = new Anime('Classroom of the Elite', 'Dub | Leg' , 'imgs/anime3.png',2);
let anime4 = new Anime('The Ryuo Works is never Done!', 'Dub | Leg' , 'imgs/anime4.png',3);
let anime5 = new Anime('UMAYON', 'Legendado' , 'imgs/anime5.png',4);
let anime6 = new Anime('ROOM CAMP', 'Legendado' , 'imgs/anime6.png',5);
const listaAnimes = [anime1,anime2,anime3,anime4,anime5,anime6];
let anime7 = new Anime('Frieren e a Jornada para o Além', 'Dub | Leg' , 'imgs/anime7.png',8);
let anime8 = new Anime('Detective Conan', 'Legendado' , 'imgs/anime8.png',1);
let anime9 = new Anime('One Piece', 'Dub | Leg' , 'imgs/anime9.png',2);
let anime10 = new Anime('The Daily Life of the Immortal King', 'Dub | Leg' , 'imgs/anime10.png',3);
let anime11 = new Anime('Kingdom', 'Dub | Leg' , 'imgs/anime11.png',4);
let anime12 = new Anime('Yowamushi Pedal', 'Legendado' , 'imgs/anime12.png',5);
const listaAnimes2 = [anime7,anime8,anime9,anime10,anime11,anime12];
let anime13 = new Anime('Hinomaru Sumo', 'Dub | Leg' , 'imgs/anime13.png',0);
let anime14 = new Anime('Umamusume: Pretty Derby', 'Legendado' , 'imgs/anime14.png',1);
let anime15 = new Anime('Captain Tsubasa', 'Dub | Leg' , 'imgs/anime15.png',2);
let anime16 = new Anime('DAYS', 'Legendado' , 'imgs/anime16.png',3);
let anime17 = new Anime('The God of High School', 'Dub | Leg' , 'imgs/anime17.png',4);
let anime18 = new Anime('PuraOra! PRIDE OF ORANGE', 'Dub | Leg' , 'imgs/anime18.png',5);
const listaAnimes3 = [anime13,anime14,anime15,anime16,anime17,anime18];
*/

let listaAnimes = [
    new Anime('Ping Pong the Animation', 'Dub | Leg', 'imgs/anime1.png', 0),
    new Anime('Kuroko Basketball', 'Legendado', 'imgs/anime2.png', 1),
    new Anime('Classroom of the Elite', 'Dub | Leg', 'imgs/anime3.png', 2),
    new Anime('The Ryuo Works is never Done!', 'Dub | Leg', 'imgs/anime4.png', 3),
    new Anime('UMAYON', 'Legendado', 'imgs/anime5.png', 4),
    new Anime('ROOM CAMP', 'Legendado', 'imgs/anime6.png', 5),
];

/*
function geraAnimes() {
    let animesHTML = document.querySelectorAll('.animeListContainer');
    animesHTML.forEach(function (anime, index) {
        let newInner = `
    </div> <img src="${listaAnimes[index].imagemURL}" alt="" class="imageList">
        <p>${listaAnimes[index].titulo}</p>
        <p>${listaAnimes[index].legenda}</p>`
        anime.innerHTML = newInner;
    })
}
*/


function trocaAnimesFrente() {
    let animesHTML = document.querySelectorAll('.animeListContainer');

    if (animesHTML[0].outerHTML.includes('<p>Ping Pong the Animation</p>')) {
        animesHTML.forEach(function (anime, index) {
            index += 6;
            let newInner = `<img src="${listaAnimes[index].imagemURL}" alt="">
            <p>${listaAnimes[index].titulo}</p>
            <p>${listaAnimes[index].legenda}</p>`
            anime.innerHTML = newInner;
        });
    } else if (animesHTML[0].outerHTML.includes('<p>Frieren e a Jornada para o Além</p>')) {
        animesHTML.forEach(function (anime, index) {
            index += 12;
            let newInner = `<img src="${listaAnimes[index].imagemURL}" alt="">
            <p>${listaAnimes[index].titulo}</p>
            <p>${listaAnimes[index].legenda}</p>`
            anime.innerHTML = newInner;
        });
    }
}

function trocaAnimesTrás() {
    let animesHTML = document.querySelectorAll('.animeListContainer');

    if (animesHTML[0].outerHTML.includes('<p>Frieren e a Jornada para o Além</p>')) {
        animesHTML.forEach(function (anime, index) {
            let newInner = `<img src="${listaAnimes[index].imagemURL}" alt="">
            <p>${listaAnimes[index].titulo}</p>
            <p>${listaAnimes[index].legenda}</p>`
            anime.innerHTML = newInner;
        });
    } else if (animesHTML[0].outerHTML.includes('<p>Hinomaru Sumo</p>')) {
        animesHTML.forEach(function (anime, index) {
            index += 6;
            let newInner = `<img src="${listaAnimes[index].imagemURL}" alt="">
            <p>${listaAnimes[index].titulo}</p>
            <p>${listaAnimes[index].legenda}</p>`
            anime.innerHTML = newInner;
        });
    }
}

function infoAnime(index) {
    let pindex;
    switch (index) {
        case 0: pindex = 0;
            break;
        case 1: pindex = 2;
            break;
        case 2: pindex = 4;
            break;
        case 3: pindex = 6;
            break;
        case 4: pindex = 8;
            break;
        case 5: pindex = 10;
            break;
    }

    document.querySelectorAll('.animeHidden')[index].style.visibility = 'visible';
    document.querySelectorAll('.imageList')[index].style.opacity = '20%';
    document.querySelectorAll('.pVisible')[pindex].style.visibility = 'hidden';
    document.querySelectorAll('.pVisible')[pindex + 1].style.visibility = 'hidden';
}

function leaveAnime(index) {
    let pindex;
    switch (index) {
        case 0: pindex = 0;
            break;
        case 1: pindex = 2;
            break;
        case 2: pindex = 4;
            break;
        case 2: pindex = 6;
            break;
        case 3: pindex = 6;
            break;
        case 4: pindex = 8;
            break;
        case 5: pindex = 10;
            break;
    }

    document.querySelectorAll('.animeHidden')[index].style.visibility = 'hidden';
    document.querySelectorAll('.imageList')[index].style.opacity = '100%'
    document.querySelectorAll('.pVisible')[pindex].style.visibility = 'visible';
    document.querySelectorAll('.pVisible')[pindex + 1].style.visibility = 'visible';

}
