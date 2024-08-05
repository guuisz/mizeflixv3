function Episodio(numero, titulo, descricao, imagemURL, driveLink) {
    this.numero = numero;
    this.titulo = titulo;
    this.descricao = descricao;
    this.imagemURL = imagemURL;
    this.driveLink = driveLink;
}

function Anime(nome, descricao, legenda, imagemURL, episodios, descricaoCompleta, nota) {
    this.nome = nome;
    this.descricao = descricao;
    this.legenda = legenda;
    this.imagemURL = imagemURL;
    this.episodios = episodios;
    this.descricaoCompleta = descricaoCompleta
    this.nota = nota;
}

const firebaseConfig = {
    apiKey: "AIzaSyCH_51kW41crOtQtCUrgJiqd61BfgSKq5s",
    authDomain: "mizeflix.firebaseapp.com",
    projectId: "mizeflix",
    storageBucket: "mizeflix.appspot.com",
    messagingSenderId: "909584409056",
    appId: "1:909584409056:web:f7e416825c3ad193098b85"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let listaAnimes = [];
let contador = 0;

async function geraAnimes() {
    try {
        const querySnapshot = await db.collection('animes').get();
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            let anime = new Anime(data.nome, data.descricao, data.legenda, data.imagemURL, ' ', data.descricaoCompleta, data.nota);
            listaAnimes[contador] = anime;
            contador += 1;
        });
    } catch (error) {
        console.error('Erro ao buscar documentos: ', error);
    }

    for (let i = 0; i < listaAnimes.length; i++) {
        let contadorEpisodios = 0;
        let episodios = [];
        try {
            const querySnapshot = await db.collection('animes').doc(`${listaAnimes[i].nome}`).collection('Episodios').get();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let episodio = new Episodio(data.numero, data.titulo, data.descricao, data.imagemURL, data.driveLink);
                episodios[contadorEpisodios] = episodio;
                contadorEpisodios += 1;
            });
        } catch (error) {
            console.error('Erro ao buscar documentos: ', error);
        }
        listaAnimes[i].episodios = episodios;
    }

};

listaAnimes.sort((a, b) => {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
});

let animeAtual;

function geraAnime(imagemURL, nome, descricao, legenda) {
    let animeDiv = document.createElement('div');
    animeDiv.classList.add('anime');

    let imgDiv = document.createElement('div');
    imgDiv.classList.add('anime-image');
    imgDiv.innerHTML = `<img src="${imagemURL}" alt="">`;

    let animeDescricao = document.createElement('div');
    animeDescricao.classList.add('anime-descricao');
    animeDescricao.innerHTML = `<p>${nome}</p> 
    <p>${descricao}</p> 
    <p>${legenda}</p>`
    animeDiv.appendChild(imgDiv);
    animeDiv.appendChild(animeDescricao);
    animeDiv.onclick = function () {
        listaAnimes.forEach(function (anime) {
            if (anime.nome == nome) {
                animeAtual = anime;
            }
        });
        localStorage.setItem("animeAtual", JSON.stringify(animeAtual));
        window.location.assign('animepage.html');
    }

    return animeDiv;
}

function geraTelaInicial() {
    let querys = document.querySelectorAll('.anime');
    querys.forEach(function (anime) {
        anime.remove();
    })
    let listaAnimesElements = [];
    contador = 0;

    listaAnimes.forEach(function (animeAtual) {
        listaAnimesElements[contador] = geraAnime(animeAtual.imagemURL, animeAtual.nome, animeAtual.descricao, animeAtual.legenda);
        contador += 1;
    });

    let animeSelector = document.querySelector('.animes-lista');
    listaAnimesElements.forEach(function (animeAtual) {
        animeSelector.appendChild(animeAtual);
    })

    let queryContainer = document.querySelector('.corpo-container').querySelector('h2');
    queryContainer.innerText = `#`;

    let letras = document.querySelector('.lista-letras').querySelectorAll('p');
    letras.forEach(function (letraAtual) {
        letraAtual.style.color = '#A0A0A0'
    });

    let letra = document.querySelector('.lista-letras').querySelectorAll('p')[0];
    letra.style.color = 'tomato';

}

function alteraAnimes(letraInicial, index) {
    let querys = document.querySelectorAll('.anime');

    querys.forEach(function (anime) {
        anime.remove();
    })

    let listaAnimesElements = [];
    let contador = 0;

    listaAnimes.forEach(function (animeAtual) {
        if (animeAtual.nome.charAt(0).toLowerCase() == letraInicial.toLowerCase()) {
            listaAnimesElements[contador] = geraAnime(animeAtual.imagemURL, animeAtual.nome, animeAtual.descricao, animeAtual.legenda);
            contador += 1;
        }
    });

    let animeSelector = document.querySelector('.animes-lista');
    listaAnimesElements.forEach(function (animeAtual) {
        animeSelector.appendChild(animeAtual);
    })

    let queryContainer = document.querySelector('.corpo-container').querySelector('h2');
    queryContainer.innerText = `${letraInicial}`;

    let letras = document.querySelector('.lista-letras').querySelectorAll('p');
    letras.forEach(function (letraAtual) {
        letraAtual.style.color = '#A0A0A0'
    });

    let letra = document.querySelector('.lista-letras').querySelectorAll('p')[index];
    letra.style.color = 'tomato';
}

(async () => {
    await geraAnimes();
    await console.log(listaAnimes);
    await geraTelaInicial();
})();