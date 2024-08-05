function Volume(numero,titulo,descricao,imagemURL,driveLink) {
    this.numero = numero;
    this.titulo = titulo;
    this.descricao = descricao;
    this.imagemURL = imagemURL;
    this.driveLink = driveLink;
}

function Manga(nome, descricao, imagemURL, volumes, descricaoCompleta, nota, imagemBG) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagemURL = imagemURL;
    this.volumes = volumes;
    this.descricaoCompleta = descricaoCompleta
    this.nota = nota;
    this.imagemBG = imagemBG;
    this.legenda = 'Traduzido';
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

let listaMangas = [];
let contador = 0;

async function geraMangas() {
    try {
        const querySnapshot = await db.collection('mangas').get();
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            let manga = new Manga(data.nome, data.descricao, data.imagemURL, data.volumes, data.descricaoCompleta, data.nota, data.imagemBG);
            listaMangas[contador] = manga;
            contador += 1;
        });
    } catch (error) {
        console.error('Erro ao buscar documentos: ', error);
    }

    for (let i = 0; i < listaMangas.length; i++) {
        let contadorVolumes = 0;
        let volumes = [];
        try {
            const querySnapshot = await db.collection('mangas').doc(`${listaMangas[i].nome}`).collection('Volumes').get();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let volume = new Volume(data.numero, data.titulo, data.descricao, data.imagemURLVL, data.driveLink);
                volumes[contadorVolumes] = volume;
                contadorVolumes += 1;
            });
        } catch (error) {
            console.error('Erro ao buscar documentos: ', error);
        }
        listaMangas[i].volumes = volumes;
    }

};

listaMangas.sort((a, b) => {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
});

let mangaAtual;

function geraManga(imagemURL,nome,descricao,legenda) {
    let mangaDiv = document.createElement('div');
    mangaDiv.classList.add('manga');

    let imgDiv = document.createElement('div');
    imgDiv.classList.add('manga-image');
    imgDiv.innerHTML = `<img src="${imagemURL}" alt="">`;

    let mangaDescricao = document.createElement('div');
    mangaDescricao.classList.add('manga-descricao');
    mangaDescricao.innerHTML = `<p>${nome}</p> 
    <p>${descricao}</p> 
    <p>${legenda}</p>`
    mangaDiv.appendChild(imgDiv);
    mangaDiv.appendChild(mangaDescricao);
    mangaDiv.onclick = function() {
        listaMangas.forEach(function(manga) {
            if(manga.nome == nome) {
                mangaAtual = manga;
            }
        });
        localStorage.setItem("mangaAtual",JSON.stringify(mangaAtual));
        window.location.assign('mangapage.html');
    }

    return mangaDiv;
}

function geraTelaInicial() {
    let querys = document.querySelectorAll('.manga');
    querys.forEach(function(manga) {
        manga.remove();
    })
    let listaMangasElements = [];
    contador = 0;

    listaMangas.forEach(function(mangaAtual) {
            listaMangasElements[contador] = geraManga(mangaAtual.imagemURL,mangaAtual.nome,mangaAtual.descricao,mangaAtual.legenda);
            contador += 1;
    });

    let mangaSelector = document.querySelector('.mangas-lista');
    listaMangasElements.forEach(function(mangaAtual) {
        mangaSelector.appendChild(mangaAtual);
    })

    let queryContainer = document.querySelector('.corpo-container').querySelector('h2');
    queryContainer.innerText = `#`;

    let letras = document.querySelector('.lista-letras').querySelectorAll('p');
    letras.forEach(function(letraAtual) {
        letraAtual.style.color = '#A0A0A0'
    });

    let letra = document.querySelector('.lista-letras').querySelectorAll('p')[0];
    letra.style.color = 'tomato';
    
}

function alteraMangas(letraInicial,index) {
    let querys = document.querySelectorAll('.manga');

    querys.forEach(function(manga) {
        manga.remove();
    })

    let listaMangasElements = [];
    let contador = 0;

    listaMangas.forEach(function(mangaAtual) {
        if(mangaAtual.nome.charAt(0).toLowerCase() == letraInicial.toLowerCase()) {
            listaMangasElements[contador] = geraManga(mangaAtual.imagemURL,mangaAtual.nome,mangaAtual.descricao,mangaAtual.legenda);
            contador += 1;
        }
    });

    let mangaSelector = document.querySelector('.mangas-lista');
    listaMangasElements.forEach(function(mangaAtual) {
        mangaSelector.appendChild(mangaAtual);
    })

    let queryContainer = document.querySelector('.corpo-container').querySelector('h2');
    queryContainer.innerText = `${letraInicial}`;

    let letras = document.querySelector('.lista-letras').querySelectorAll('p');
    letras.forEach(function(letraAtual) {
        letraAtual.style.color = '#A0A0A0'
    });

    let letra = document.querySelector('.lista-letras').querySelectorAll('p')[index];
    letra.style.color = 'tomato';
}

(async () => {
    await geraMangas();
    await console.log(listaMangas);
    await geraTelaInicial();
})();