const objString = localStorage.getItem('animeAtual');
const animeAtual = JSON.parse(objString);
console.log(animeAtual.imagemURL);

function geraImagemBG() {
    let query = document.querySelectorAll('.img-bg2')[0];
    let img = document.createElement('img');
    img.src = animeAtual.imagemURL;
    query.appendChild(img);

    document.querySelectorAll('.img-bg1')[0].style.backgroundImage = `image-set("${animeAtual.imagemURL}")`;
}

function geraContent() {
    let query = document.querySelectorAll('.anime-info')[0];

    let animeName = document.createElement('p');
    animeName.innerText = `${animeAtual.nome}`;

    let animeLegenda = document.createElement('p');
    animeLegenda.innerText = `${animeAtual.legenda}`;

    let animeNota = document.createElement('p');
    animeNota.innerText = `Nota: ${animeAtual.nota}`

    let animeDesc = document.createElement('p');

    animeDesc.innerText = `${animeAtual.descricaoCompleta}`;
    let episodios = document.createElement('p');
    episodios.innerText = `Episódios`;
    query.appendChild(animeName);
    query.appendChild(animeLegenda);
    query.appendChild(animeNota);
    query.appendChild(animeDesc);
    query.appendChild(episodios);
}

function geraEpisódios() {

    animeAtual.episodios.forEach(function(episodioAtual,index) {
        console.log(animeAtual.nome);
        let query = document.querySelectorAll('.anime')[0];
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('anime-image');
        imgDiv.innerHTML = `<img src="${episodioAtual.imagemURL}" alt="">`;
    
        let animeDesc = document.createElement('div');  
        animeDesc.classList.add('anime-descricao');
        animeDesc.innerHTML = `<p>${episodioAtual.titulo}</p> 
        <p class="descricao-ep">${episodioAtual.descricao}</p>`
        
        imgDiv.onclick = function() {
            localStorage.setItem("episodioAtual",JSON.stringify(episodioAtual.driveLink));
            window.location.assign('animePlayer.html');
        }
        query.appendChild(imgDiv);

        animeDesc.onclick = function() {
            localStorage.setItem("episodioAtual",JSON.stringify(episodioAtual.driveLink));
            window.location.assign('animePlayer.html');
        }
        query.appendChild(animeDesc);
    
    })

}

geraImagemBG();
geraContent();
geraEpisódios();