function Volume(numero,titulo,descricao,imagemURL,driveLink) {
    this.numero = numero;
    this.titulo = titulo;
    this.descricao = descricao;
    this.imagemURL = imagemURL;
    this.driveLink = driveLink;
}

function Manga(nome, descricao, legenda, imagemURL, volumes, descricaoCompleta, nota, imagemBG) {
    this.nome = nome;
    this.descricao = descricao;
    this.legenda = legenda;
    this.imagemURL = imagemURL;
    this.volumes = volumes;
    this.descricaoCompleta = descricaoCompleta
    this.nota = nota;
    this.imagemBG = imagemBG;
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

async function addMangaToFirestore() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const imagemBG = document.getElementById('imagemBG').value;
    const imagemURL = document.getElementById('imagemURL').value;
    const descricaoCompleta = document.getElementById('descricaoCompleta').value;
    const nota = document.getElementById('nota').value;

    try {
        const docRef = db.collection('mangas').doc(nome);
        await docRef.set({
            nome: nome,
            descricao: descricao,
            imagemBG: imagemBG,
            imagemURL: imagemURL,
            descricaoCompleta: descricaoCompleta,
            nota: nota,
        });
        console.log('Manga adicionado com ID: ', docRef.id);
      } catch (error) {
        console.error('Erro ao adicionar manga: ', error);
      }
    };

    async function addVolumeToFirestore() {
        const nomeManga = document.getElementById('nomeManga').value;
        const idVolume = document.getElementById('idVolume').value;
        const numeroVolume = document.getElementById('numeroVolume').value;
        const titulo = document.getElementById('titulo').value;
        const descricaoVolume = document.getElementById('descricaoVolume').value;
        const driveLink = document.getElementById('driveLink').value;
        const imagemURLVL = document.getElementById('imagemURLVL').value;

        try {
            const docRef = db.collection('mangas').doc(nomeManga).collection('Volumes').doc(idVolume);
            await docRef.set({
                nome: nomeManga,
                numero: numeroVolume,
                titulo: titulo,
                descricao: descricaoVolume,
                driveLink: driveLink,
                imagemURLVL: imagemURLVL,
            });
            console.log('Volume adicionado com ID: ', docRef.id);
          } catch (error) {
            console.error('Erro ao adicionar anime: ', error);
          }
        };