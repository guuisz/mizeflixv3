const objString = localStorage.getItem('mangaAtual');
const mangaAtual = JSON.parse(objString);
console.log(mangaAtual.nome);

function geraImagemBG() {
    let query = document.querySelectorAll('.img-bg2')[0];
    let img = document.createElement('img');
    img.src = mangaAtual.imagemBG;
    query.appendChild(img);

    document.querySelectorAll('.img-bg1')[0].style.backgroundImage = `image-set("${mangaAtual.imagemBG}")`;
}

function geraContent() {
    let query = document.querySelectorAll('.manga-info')[0];

    let mangaName = document.createElement('p');
    mangaName.innerText = `${mangaAtual.nome}`;

    let mangaLegenda = document.createElement('p');
    mangaLegenda.innerText = `${mangaAtual.legenda}`;

    let mangaNota = document.createElement('p');
    mangaNota.innerText = `Nota: ${mangaAtual.nota}`

    let mangaDesc = document.createElement('p');

    mangaDesc.innerText = `${mangaAtual.descricaoCompleta}`;
    let volumes = document.createElement('p');
    volumes.innerText = `Volumes`;
    query.appendChild(mangaName);
    query.appendChild(mangaLegenda);
    query.appendChild(mangaNota);
    query.appendChild(mangaDesc);
    query.appendChild(volumes);
}


function geraVolumes() {
    mangaAtual.volumes.sort((a, b) => {

        if (Number(a.numero) < Number(b.numero)) {
            return -1;
        }
        if (Number(a.numero) > Number(b.numero)) {
            return 1;
        }
    });

    mangaAtual.volumes.forEach(function(volumeAtual,index) {
        console.log(volumeAtual.numero);
        let query = document.querySelectorAll('.manga')[0];
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('manga-image');
        imgDiv.innerHTML = `<img src="${volumeAtual.imagemURL}" alt="">`;
    
        let mangaDesc = document.createElement('div');  
        mangaDesc.classList.add('manga-descricao');
        mangaDesc.innerHTML = `<p>${volumeAtual.titulo}</p> 
        <p class="descricao-ep">${volumeAtual.descricao}</p>`
        
        imgDiv.onclick = function() {
            localStorage.setItem("volumeAtual",JSON.stringify(volumeAtual.driveLink));
            window.location.assign('mangaPlayer.html');
        }
        query.appendChild(imgDiv);
        mangaDesc.onclick = function() {
            localStorage.setItem("volumeAtual",JSON.stringify(volumeAtual.driveLink));
            window.location.assign('mangaPlayer.html');
        }
        query.appendChild(mangaDesc);
    
    })

}

geraImagemBG();
geraContent();
geraVolumes();