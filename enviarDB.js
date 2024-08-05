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

async function addAnimeToFirestore() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const legenda = document.getElementById('legenda').value;
    const imagemURL = document.getElementById('imagemURL').value;
    const descricaoCompleta = document.getElementById('descricaoCompleta').value;
    const nota = document.getElementById('nota').value;

    try {
        const docRef = db.collection('animes').doc(nome);
        await docRef.set({
            nome: nome,
            descricao: descricao,
            legenda: legenda,
            imagemURL: imagemURL,
            descricaoCompleta: descricaoCompleta,
            nota: nota,
        });
        console.log('Anime adicionado com ID: ', docRef.id);
      } catch (error) {
        console.error('Erro ao adicionar anime: ', error);
      }
    };

    async function addEpisodioToFirestore() {
        const nomeAnime = document.getElementById('nomeAnime').value;
        const idEpisodio = document.getElementById('idEpisodio').value;
        const numeroEpisodio = document.getElementById('numeroEpisodio').value;
        const titulo = document.getElementById('titulo').value;
        const descricaoEpisodio = document.getElementById('descricaoEpisodio').value;
        const driveLink = document.getElementById('driveLink').value;
        const imagemURLEP = document.getElementById('driveLink').value;

        try {
            const docRef = db.collection('animes').doc(nomeAnime).collection('Episódios').doc(idEpisodio);
            await docRef.set({
                nome: nomeAnime,
                numero: numeroEpisodio,
                titulo: titulo,
                descricao: descricaoEpisodio,
                driveLink: driveLink,
                imagemURL: imagemURLEP,
            });
            console.log('Episódio adicionado com ID: ', docRef.id);
          } catch (error) {
            console.error('Erro ao adicionar anime: ', error);
          }
        };